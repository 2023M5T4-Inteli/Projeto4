const mongoose = require('mongoose')
const bycrypt = require("bcryptjs");

const indemnitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        insurance: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Insurance',
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

const indemnity = mongoose.model('Indemnity', indemnitySchema)

module.exports = indemnity