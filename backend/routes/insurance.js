// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()
const Insurance = require('../models/insurance')
const User = require('../models/user')

//ROTA PARA CRIAR UM GRUPO DE SEGURO (ENVIAR OS CONVITES AOS INTERESSADOS)
router.post('/admin/create', adminMiddleware, async (req, res) => {
    try {
        const usersThatDontHaveGroup = await User.find({ insurance: { $exists: false } })
        console.log(usersThatDontHaveGroup)
        console.log(req.body.minPhoneValue)

        const invites = []
        for (let i = 0; i < usersThatDontHaveGroup.length; i++) {
            if (usersThatDontHaveGroup[i].phoneValue >= req.body.minPhoneValue) {
                invites.push(usersThatDontHaveGroup[i]._id)
            }
        }

        if (invites.length <= req.body.minPeople) {
            return res.status(500).send("Não foram encontrados usuários suficientes")
        }

        const insurance = new Insurance({ ...req.body, isActive: false, invites })
        await insurance.save()

        res.send(insurance)

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER TODOS OS SEGUROS
router.get('/admin', adminMiddleware, async (req, res) => {
    try {

        const insurance = await Insurance.find({})

        res.json(insurance)

    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER UM ÚNICO GRUPO
router.get('/admin/:id', adminMiddleware, async (req, res) => {
    try {

        const insurance = await Insurance.findOne({ _id: req.params.id })

        res.send(insurance)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER O GRUPO QUE O USUÁRIO PARTICIPA
router.get('/user/me', authMiddleware, async (req, res) => {
    try {

        const insurance = await Insurance.findOne({ user: req.user._id })

        res.send(insurance)

    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/user/invite', authMiddleware, async (req, res) => {
    try {
        if (req.user.insurance) {
            return res.status(500).send("Esse usuário já participa de um grupo")
        }
        const insurance = await Insurance.findOne({ _id: req.body.insurance })
        
        if (!insurance) {
            return res.status(500).send("Seguro não encontrado")
        }

        if (!insurance.invites) {
            return res.status(500).send("Esse seguro não possui convites")
        }

        let exists = false
        for (let i = 0; i < insurance.invites.length; i++) {
            if (insurance.invites[i].equals(req.user._id)) {
                exists = true
            }
        }

        if (!exists) {
            return res.status(500).send("Esse usuário não foi chamado para este grupo")
        }

        req.user.insurance = req.body.insurance
        await req.user.save()

        res.send(req.user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router
