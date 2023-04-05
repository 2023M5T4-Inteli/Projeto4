// Importa a lib mongoose para se conectar ao MongoDB
const mongoose = require("mongoose");

const validator = require("validator"); // Importa a lib para validação
const jwt = require("jsonwebtoken"); // Importa a lib para gerar tokens de autenticação
const bycrypt = require("bcryptjs"); // Importa a lib para criptografar senhas

// Definição do Schema de usuário
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validade(value) { // Validador pra verificar se o email é válido
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlenght: 7,
      select: false,
    },
    imei: {
      type: String,
      trim: true,
      required: true,
      minlenght: 15,
      maxlenght: 15,
    },
    phoneModel: {
      type: String,
      required: true,
    },
    phoneValue: {
      type: Number,
      required: true,
      minlenght: 3,
      trim: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    wallet: {
      type: String,
      required: true,
    },
    insurance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Insurance",
      required: false,
    },
    insuranceActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.virtual("invites", {
  ref: "Insurance",
  localField: "_id",
  foreignField: "invites",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// Gera um token de autenticação para o usuário
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 60 * 60,
  });

  return token;
};

// Buscar um usuário por email e senha
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email }).select("+password");

  // Caso não existe user com esse email
  if (!user) {
    throw new Error("Não foi possível entrar");
  }

  const isMatch = await bycrypt.compare(password, user.password);

  // Caso a senha fornecida não seja a mesma armazenada
  if (!isMatch) {
    throw new Error("Não foi possível entrar");
  }

  return user;
};

// Middleware executado antes de salvar um usuário
userSchema.pre("save", async function (next) {
  const user = this;
  
  if (user.isModified("password")) {
    user.password = await bycrypt.hash(user.password, 8);
  }

  if (user.isModified("imei")) {
    user.imei = await bycrypt.hash(user.imei, 8);
  }

  next();
});

// Criação do modelo
const User = mongoose.model("User", userSchema);

// Exporta o modelo para que possa ser usada em outros arquivos
module.exports = User;
