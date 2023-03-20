// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()
const Insurance = require('../models/insurance.js')


//ROTA PARA CRIAR UM GRUPO DE SEGURO (ENVIAR OS CONVITES AOS INTERESSADOS)
router.post('/insurance/admin/create', adminMiddleware, async (req, res)=>{
    try {
        const insurance = new Insurance(req.body)
        await insurance.save()

        res.send()

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER TODOS OS SEGUROS
router.get('/insurance/admin', adminMiddleware, async(req, res)=>{
    try {

        const insurance = await Insurance.find({ })

        res.json(insurance)

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER UM ÚNICO GRUPO
router.get('/insurance/admin/:id', adminMiddleware, async(req, res)=>{
    try {

        const insurance = await Insurance.findOne({ _id: req.params.id })

        res.send(insurance)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER O GRUPO QUE O USUÁRIO PARTICIPA
router.get('/insurance/user/me', authMiddleware, async(req, res)=>{
    try {

        const insurance = await Insurance.findOne({user: req.user._id})

        res.status(200).json(insurance)
        res.send(insurance)

    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/insurance/user', authMiddleware, async(req, res)=>{

})