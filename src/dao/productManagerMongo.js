const productModel = require('./models/Product.model')

class ProductManagerMongo {
    async getProducts(){
        return await productModel.find()
    }

    async getProductById(pid){
        return await productModel.findOne({_id: pid})
    }

    async addProduct(newProduct){
        return await productModel.create(newProduct)
    }

    async updateProduct(pid, modifiedProduct){
        return await productModel.updateOne({_id: pid}, modifiedProduct)
    }

    async deleteProduct(pid){
        return await productModel.deleteOne({_id: pid})
    }
}

module.exports = new ProductManagerMongo()