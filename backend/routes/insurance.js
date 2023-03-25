// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()
const Insurance = require('../models/insurance')
const User = require('../models/user')
const { SeguroFactory } = require('../ethers')

//ROTA PARA CRIAR UM GRUPO DE SEGURO (ENVIAR OS CONVITES AOS INTERESSADOS)
router.post('/admin/create', adminMiddleware, async (req, res) => {
    try {
        const usersThatDontHaveGroup = await User.find({ insurance: { $exists: false } })

        const invites = []
        for (let i = 0; i < usersThatDontHaveGroup.length; i++) {
            if (usersThatDontHaveGroup[i].phoneValue >= req.body.minPhoneValue) {
                invites.push(usersThatDontHaveGroup[i]._id)
            }
        }

        const insurance = new Insurance({ ...req.body, isActive: false, invites })
        await insurance.save()

        res.send(insurance)
    } catch (err) {
        res.status(500).send(err)
    }
})

// CRIAR ROTA DE APROVAR SEGURO...
router.get('/admin/approve/:id', adminMiddleware, async (req, res) => {
    try {
        const insurance = await Insurance.findOne({ _id: req.params.id })
        if (insurance.isActive) {
            return res.status(500).send('Seguro já está ativo!')
        }

        await insurance.populate('users')

        const invitesUserWallets = []
        const invitesUserImeis = []

        for (let i = 0; i < insurance.users.length; i++) {
            invitesUserWallets.push(insurance.users[i].wallet)
            invitesUserImeis.push(insurance.users[i].imei)
        }

        const seguroFactory = await SeguroFactory()
        const tx = await seguroFactory.createSeguro(
            insurance.adminTax,
            invitesUserWallets,
            invitesUserImeis,
            insurance.lmiTax
        )
        await tx.wait()

        const seguroAddresses = await seguroFactory.viewSeguros()

        insurance.address = seguroAddresses[seguroAddresses.length - 1]
        insurance.isActive = true
        await insurance.save()

        res.send()
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA VER TODOS OS SEGUROS
router.get('/admin', adminMiddleware, async (req, res) => {
    try {
        const fetchedInsurances = await Insurance.find({})

        if (fetchedInsurances.length == 0) {
            return res.status(500).send('Nenhum seguro encontrado!')
        }
        const insurancesPromise = fetchedInsurances.map(async (insurance) => await insurance.populate('users'))
        const insurances = await Promise.all(insurancesPromise)

        res.send(insurances)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//ROTA PARA VER UM ÚNICO GRUPO
router.get('/admin/:id', adminMiddleware, async (req, res) => {
    try {
        const insurance = await Insurance.findOne({ _id: req.params.id })
        await insurance.populate('users')
        res.send(insurance)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//ROTA PARA VER O GRUPO QUE O USUÁRIO PARTICIPA
router.get('/user/me', authMiddleware, async (req, res) => {
    try {
        if (!req.user.insurance) {
            return res.status(500).send('Esse usuário ainda não participa de um grupo')
        }
        const insurance = await Insurance.findOne({ _id: req.user.insurance })

        res.send(insurance)
    } catch (err) {
        res.status(500).send(err)
    }
})

// ROTA PARA VER MEUS CONVITES
router.get('/user/invites', authMiddleware, async (req, res) => {
    try {
        if (req.user.insurance) {
            return res.status(500).send('Esse usuário já participa de um grupo')
        }

        await req.user.populate('invites')

        res.send(req.user.invites)
    } catch (err) {
        res.status(500).send(err)
    }
})

// ROTA PARA ACEITAR UM CONVITE
router.patch('/user/invite', authMiddleware, async (req, res) => {
    try {
        if (req.user.insurance) {
            return res.status(500).send('Esse usuário já participa de um grupo')
        }
        const insurance = await Insurance.findOne({ _id: req.body.insurance })
        await insurance.populate('users')

        if (!insurance) {
            return res.status(500).send('Seguro não encontrado')
        }

        if (!insurance.invites) {
            return res.status(500).send('Esse seguro não possui convites')
        }

        let exists = false
        for (let i = 0; i < insurance.invites.length; i++) {
            if (insurance.invites[i].equals(req.user._id)) {
                exists = true
            }
        }

        if (!exists) {
            return res.status(500).send('Esse usuário não foi chamado para este grupo')
        }

        if (insurance.users.length >= insurance.maxPeople) {
            return res
                .status(500)
                .send('Não foi possível aceitar o convite, seguro já alcançou o número máximo de participantes')
        }

        req.user.insurance = req.body.insurance
        await req.user.save()

        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA PARA CRIAR UM GRUPO DE SEGURO (ENVIAR OS CONVITES AOS INTERESSADOS)
router.get('/contracts', adminMiddleware, async (req, res) => {
    try {
        const seguroFactory = await SeguroFactory()
        const tx = await seguroFactory.viewSeguros()

        res.send(tx)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router
