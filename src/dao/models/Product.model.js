const {Schema, model} = require('mongoose')

const collection = 'products'

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code:{
        type: String,
        required: true
    }
})

module.exports = model(collection, productSchema)