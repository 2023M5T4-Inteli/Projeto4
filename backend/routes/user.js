// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()
const User = require('../models/user.js')
const Insurance = require('../models/insurance')

//ROTA DE LOGIN DO USUÁRIO
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        
        const userResponse = user.toObject()
        delete userResponse.password
        userResponse.token = token

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        })

        res.send(userResponse)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

//ROTA DE LOGOUT DO USUÁRIO
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        })
        res.send()
    } catch (e) {
        restart.status(500).send()
    }
})

//ROTA DE PERFIL DO USUÁRIO
router.get('/me', authMiddleware, async (req, res) => {
    res.send(req.user)
})

//ROTA DE DASHBOARD DO USUÁRIO (MOSTRA OS GRUPOS AINDA NÃO ATIVOS)
router.get('/admin', adminMiddleware, async (req, res) => {
    try {
        const invites = await Insurance.find({ isActive: false })
        res.send(invites)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ROTA DE CRIAÇÃO DE CONTA DO USUÁRIO
router.post('/signup', async (req, res) => {
    try {
        

        const userExists = await User.findOne({email: req.body.email})
        if (userExists) {
            return res.status(500).send("Email já existente para um usuário!")
        }

        
        const user = new User(req.body)
        user.admin = false

        await user.save()

        const token = await user.generateAuthToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        })

        res.send(user)

    } catch (err) {
        console.log(err)

        res.status(500).send(err)
    }
})

module.exports = router


