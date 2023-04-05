// Importa a lib jsonwebtoken
const jwt = require('jsonwebtoken')

// Importa o modelo do userSchema
const User = require('../models/user')

// Função de autenticação middleware (user)
exports.authMiddleware = async (req, res, next)=>{
    try{
        const token = req.cookies.token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        // Busca o usuário no banco de dados com o _id do token decodificado
        const user = await User.findOne({_id: decoded._id})

        // Se não houver usuário com esse _id, lança um erro
        if(!user){
            throw new Error()
        }

        req.token = token 
        req.user = user

        next()
    }catch(e){
        res.status(401).send({error: 'Por favor, faça login ou crie uma conta'})
    }
}

// Função de autenticação middleware (admin)
exports.adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded =  await jwt.verify(token, process.env.JWT_SECRET)

        // Busca o usuário no banco de dados com o _id do token decodificado e admin
        const user = await User.findOne({_id: decoded._id, admin: true})

        // Se não houver usuário com esse _id ou que seja admin, lança um erro
        if (!user){
            throw new Error()
        }

        req.token = token
        req.user = user 

        next()
    } catch(e){
        res.status(401).send({error: 'Por favor, faça o Login'})
    }
}