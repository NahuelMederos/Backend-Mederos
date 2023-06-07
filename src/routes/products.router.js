const express = require('express')
const ProductManager = require ('../Managers/productManager')

const router = express.Router()
const productos = new ProductManager()




router.get('/', async (req, res)=>{  
    let limit = parseInt(req.query.limit);
    let arrayProductos = await productos.getProducts()
    if(!limit){
        res.send(arrayProductos)
    }else{
        const arrayLimitado = arrayProductos.slice(0, limit)
        res.send(arrayLimitado)
    }
    
})

router.get('/:pid', async (req, res)=>{  
    const pid = parseInt(req.params.pid)
    const producto = await productos.getProductById(pid)
    if(producto){
        res.send(producto)
    }else{
        res.status(400).send('No se encontro el producto')
    }
})

router.post('/', (req, res)=>{    
    const {title, description, code, price, stock, category, thumbnails} = req.body
    const productoNuevo = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
        thumbnails: thumbnails,
        status: true
    }   
    return res.send(productos.addProduct(productoNuevo))
})

router.put("/:pid", async (req,res)=>{
    const pid = parseInt(req.params.pid)
    const {title, description, code, price, stock, category, thumbnails} = req.body
    const productoModificado = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
        thumbnails: thumbnails,
        status: true
    }   
    return res.send(productos.modifyProduct(pid,productoModificado))
})

router.delete("/:pid", async (req,res)=>{
    const pid = parseInt(req.params.pid)
    return res.send(productos.deleteProduct(pid))
})

module.exports = router