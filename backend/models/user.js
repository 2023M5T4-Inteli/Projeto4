const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            validade(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlenght: 7,
            select: false
        },
        imei: {
            type: String,
            trim: true,
            required: true,
            minlenght: 15,
            maxlenght: 15,
            select: false
        },
        phoneModel: {
            type: String,
            required: true,
        },
        phoneValue: {
            type: Number,
            required: true,
            minlenght: 3,
            trim: true
        },
        admin: {
            type: Boolean,
            required: true,
            default: false
        },
        insurance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Insurance"
        }
    },
    { timestamps: true }
)

userSchema.virtual('invites', {
    ref: 'Insurance',
    localField: '_id',
    foreignField: 'invites'
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 2 * 60 * 60
    })

    return token
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new Error('Não foi possível entrar')
    }

    const isMatch = await bycrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Não foi possível entrar')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 8)
    }

    if (user.isModified('imei')) {
        user.imei = await bycrypt.hash(user.imei, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User