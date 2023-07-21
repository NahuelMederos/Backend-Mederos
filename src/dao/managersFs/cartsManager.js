const fs = require('fs')

class CartManager {
    constructor(){
        this.path = 'src/carrito.json'
    }

    leerArchivo = async () => {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            return []
        }
    }

    createCart = async (products) => {
        
        let carts = await this.leerArchivo()
        
        if(carts.length === 0){
            carts.push({id: 1, ...products})
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null,2), 'utf-8')
            return carts
        }
        carts.push({id: carts.length + 1, ...products})
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null,2), 'utf-8')
        return carts
    }

    addProductInCart = async (cid, pid) => {
        try {
            let cartsDb = await this.leerArchivo()

            const idxCart = cartsDb.findIndex(cart => cart.id === cid) 
            if (idxCart === -1) {
                return 'No existe el cart'
            }
            // buscando el product pid
            const idxProduct = cartsDb[idxCart].products.findIndex(prod => prod.id === pid)
            if (idxProduct===-1) {
                cartsDb[idxCart].products.push({id: pid, quantity: 1})
            } else {
                cartsDb[idxCart].products[idxProduct].quantity ++                
            }

            await fs.promises.writeFile(this.path, JSON.stringify(cartsDb, null, 2), 'utf-8')
            return cartsDb


        } catch (error) {
            return new Error(error)
        }
    }

    getCartById = async (cid) => {
        let cartsDb = await this.leerArchivo()

        let cart = cartsDb.find(cart => cart.id === cid)
        if (!cart) {
            return 'No existe el carrito'
        }
        return cart
    }

}

module.exports = {
    CartManager
}