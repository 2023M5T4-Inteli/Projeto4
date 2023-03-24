// importar bibliotecas
const express = require('express')
const bcrypt = require('bcryptjs')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')
const router = express.Router()



