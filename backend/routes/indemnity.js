// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const Indemnity = require('../models/indemnity.js')
const router = express.Router()

//ROTA PARA PEDIR UMA NOVA INDENIZAÇÃO
router.post('/indemnity/create', authMiddleware, async (req, res) => {
    try {
        const indemnity = new Indemnity(req.body)
        indemnity.approved = false
        await indemnity.save()

        res.send()

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VISUALIZAR AS INDENIZAÇÕES
router.get('/indemnity/admin', adminMiddleware, async (req, res) => {
    try {

        const indemnity = await Indemnity.find({})

        res.json(indemnity)

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA O USUÁRIO VER UMA INDENIZAÇÃO
router.get('/indemnity/:id', authMiddleware, async (req, res) => {

    try {

        const indemnity = await Indemnity.findOne({ _id: req.params.id, user: req.user._id })

        res.status(200).json(indemnity)
        res.send(indemnity)

    } catch (err) {
        res.status(500).send(err)
    }

})

//ROTA PARA O ADMINISTRADOR VER UMA INDENIZAÇÃO
router.get('/indemnity/admin/:id', adminMiddleware, async (req, res) => {

    try {

        const indemnity = await Indemnity.findOne({ _id: req.params.id })

        res.send(indemnity)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA O ADMINISTRADOR APROVAR OU RECUSAR UMA INDENIZAÇÃO
router.patch('/indemnity/admin/:id', adminMiddleware, async (req, res) => {
    try {

        const updatedindemnity = await Indemnity.findOne({ _id: req.params.id })
        updatedindemnity.approved = req.body.approved
        await updatedindemnity.save()

        res.send(updatedindemnity)

    } catch (err) {
        res.status(500).send(err)
    }
})