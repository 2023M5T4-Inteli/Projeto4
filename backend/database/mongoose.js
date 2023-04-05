// Importa a lib mongoose para se conectar ao MongoDB
const mongoose = require('mongoose')


const connectDB = ()=>{
    // Define pelo env a URL de conexão com o MongoDB
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('MongoDB connection SUCESS')
}

// Exporta a função connectDB para que possa ser usada em outros arquivos
module.exports = connectDB