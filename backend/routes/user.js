// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()
const user = require('../models/user.js')

router.post('/login', async (req,res) =>{
    try{
        const user = await user.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        const userResponse = user.toObject()
        delete userResponse.password
        userResponse.token = token

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2*60*60*1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development'?'none':'lax',
        })

        res.send(userResponse)
    } catch(e){
        res.status(400).send({error: e.message})
    }
})

router.post('/logout', authMiddleware, async (req, res) =>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 2 * 60 * 60 * 1000,
            path: '/',
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        })
        res.send()
    } catch (e){
        restart.status(500).send()
    }
})

router.get('/me', authMiddleware, async (req, res)=>{
        res.send(req.user)
})

router.get('/admin', adminMiddleware, async (req, res)=>{
        try {
            const users = await user.find()
            res.send(users)
        } catch (err){
            res.status(500).send(err)
        }
})

router.post('/signup', async (req, res)=>{
        try{
            const {
                email,
                password,
                imei,
                phoneModel,
                phoneValue,
                //walletAddress,
            } = req.body

            const userPassword = await bcrypt.hash(req.body.password, 8)

            await userSchema.create(user)

            res.status(201)

            await mongoose.close()

            const token = await generateAuthToken(user._id)

            res.cookie('token', token, {
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 2*60*60*1000,
                path: '/',
                sameSite: process.env.NODE_ENV !== 'development'?'none':'lax',
            })
    
            res.redirect('/notifications')
            
        } catch (err){
            res.status(500).send(err)
        }
})

router.delete('/:id', adminMiddleware, async (req, res)=>{
        try{
            await user.findByIdAndDelete(req.params.id)
            res.send()
        }catch (err){
            res.status(500).send({error: err.message})
        }
})

module.exports = router


