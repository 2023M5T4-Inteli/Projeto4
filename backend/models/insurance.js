// Importa a lib mongoose para se conectar ao MongoDB
const mongoose = require('mongoose')

// Definição do Schema de seguro mútuo
const insuranceSchema = new mongoose.Schema(
    {
        adminTax:{
            type: Number,
            trim: true,
            required: true,
            maxlenght: 2,
        },
        minPhoneValue:{
            type: Number,
            trim: true,
            required: true, 
        },
       minPeople:{
        type: Number,
        required: true,
        minlenght: 1,
       },
       maxPeople:{
        type: Number,
        required: false,
       },
       inviteExpiration: {
        type: Date,
        required: true,
       },
       lmiTax: {
        type: Number,
        required: true,
        trim: true,
        maxlenght: 2,
       },
       isActive:{
        type: Boolean,
        required: true,
        default: false,
       },
       address: {
        type: String,
        required: false
       },
       invites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       }]
    },
    {timestamps: true}
)

insuranceSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'insurance'
})

insuranceSchema.set('toObject', { virtuals: true });
insuranceSchema.set('toJSON', { virtuals: true });

// Criação do modelo
const Insurance = mongoose.model('Insurance', insuranceSchema)

// Exporta o modelo para que possa ser usada em outros arquivos
module.exports = Insurance