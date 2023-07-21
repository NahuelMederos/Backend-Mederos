const {connect} = require('mongoose')

let url = 'mongodb+srv://Nahuel:Minerva.123@coderexample.u5j1rkp.mongodb.net/ecommerce'

const objConfig = {
    connectDB: async ()=>{
        try {
            await connect(url)
            console.log('Base de datos conectada');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    objConfig
}