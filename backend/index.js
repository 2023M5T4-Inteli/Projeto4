const express = require('express')
const app = express()
const port = 3001
require('dotenv').config()

require('./database/mongoose')()

app.use(express.json())

var cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

const userRoutes = require('./routes/user')
app.use('/users', userRoutes)

const insuranceRoutes = require('./routes/insurance')
app.use('/insurance', insuranceRoutes)

const indemnityRoutes = require('./routes/indemnity')
app.use('/indemnity', indemnityRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
