const express = require('express')
const app = express()
const port = 3000
require('dotoenv').config()

require('.db/mongoose')()

app.use(express.json())

var cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
)

const userRoutes = require("./routes/user")
app.use(userRoutes)

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})