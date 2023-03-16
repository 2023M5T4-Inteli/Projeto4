const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

const indemnitySchema = new mongoose.Schema(
    {
        value:{
            type: Number,
            trim: true,
            required: true,
        },
        walletAdress: {
            type: String,
            trim: true,
            required: true,
            unique: true
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
    },
    {timestamps: true}
)


const indemnity = mongoose.model('indemnity', indemnitySchema)

module.exports = User