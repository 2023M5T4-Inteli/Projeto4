const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

require('./database/mongoose')()

app.use(express.json())

var cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(
    cors()
)

const userRoutes = require("./routes/user")
app.use('/users', userRoutes)


const insuranceRoutes = require("./routes/insurance")
app.use('/insurance', insuranceRoutes)

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})