// Importa a lib mongoose para se conectar ao MongoDB
const mongoose = require('mongoose')

// Definição do Schema de indenização
const indemnitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        value: {
            type: Number,
            trim: true,
            required: true,
        },
        imei: {
            type: String,
            trim: true,
            required: true,
            minlenght: 15,
            maxlenght: 15,
        },
        motive: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true
        },
        approved: {
            type: Boolean,
            required: false,
            default: false,

        }
    },
    { timestamps: true }
)

// Criação do modelo
const indemnity = mongoose.model('Indemnity', indemnitySchema)

// Exporta o modelo para que possa ser usada em outros arquivos
module.exports = indemnity