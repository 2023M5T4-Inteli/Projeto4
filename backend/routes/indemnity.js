// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const user = require('../models/indemnity.js')
const router = express.Router()

router.post('/indemnity/create', async (req,res)=>{
    try{
        const {
            //value,
            //walletAddress,
            imei,
            motive,
        } = req.body

        await indemnitySchema.create(indemnity)

        res.status(201)

        await mongoose.close()
    } catch (err){
        res.status(500).send(err)
    }
})

router.get('/indemnity/admin', async (req,res)=>{
    var query = indemnity.find()
    query.select
})