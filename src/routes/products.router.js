const express = require('express')
const ProductManager = require ('../dao/productManagerMongo')
const router = express.Router()




router.get('/', async (req, res)=>{  
    let limit = parseInt(req.query.limit);
    let arrayProductos = await ProductManager.getProducts()
    if(!limit){
        res.send(arrayProductos)
    }else{
        const arrayLimitado = arrayProductos.slice(0, limit)
        res.send(arrayLimitado)
    }
    
})

router.get('/:pid', async (req, res)=>{  
    const pid = req.params.pid
    const producto = await ProductManager.getProductById(pid)
    if(producto){
        res.send(producto)
    }else{
        res.status(400).send('No se encontro el producto')
    }
})

router.post('/', async (req, res)=>{    
    const newProduct = req.body
    const resp = await ProductManager.addProduct(newProduct)
    return res.send(resp)
})

router.put("/:pid", async (req,res)=>{
    const {pid} = req.params

    let modifiedProduct = req.body
    if (!modifiedProduct.title || !modifiedProduct.thumbnail || !modifiedProduct.price || !modifiedProduct.code) {
        return res.status(400).send({ message: 'Pasar todos los datos'})
    }

    let resp = await ProductManager.updateProduct(pid, modifiedProduct)
    res.status(201).send({ 
        users: resp,
        message: 'usuario modificado' 
    })
})

router.delete("/:pid", async (req,res)=>{
    const pid = req.params.pid
    return res.send(ProductManager.deleteProduct(pid))
})

module.exports = router