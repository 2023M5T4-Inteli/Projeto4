const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('MongoDB connection SUCESS')
}

module.exports = connectDB