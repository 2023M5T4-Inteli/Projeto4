const mongoose = require('mongoose')

const indemnitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        value:{
            type: Number,
            trim: true,
            required: true,
        },
        imei:{
            type: String,
            trim: true,
            required: true,
            minlenght: 15,
            maxlenght: 15, 
            select: false
        },
       motive:{
        type: String,
        required: true,
       },
       approved:{
        type: Boolean,
        required: false,
        default: false,

       }
    },
    {timestamps: true}
)


const indemnity = mongoose.model('Indemnity', indemnitySchema)

module.exports = indemnity