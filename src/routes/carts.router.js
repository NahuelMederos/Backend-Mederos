const express = require('express')
const {CartManager} = require("../dao/cartsManagerMongo")

const router = express.Router()

router.post("/", async (req,res)=>{
    const resp = await CartManager.createCart(req.body.products ? req.body : {products: []})
    res.send({resp}) 
})

router.get("/", async(req,res)=>{
    const resp = await CartManager.leerArchivo()
    res.send(resp)
})

router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const resp = await CartManager.getCartById(parseInt(cid))
    res.send({resp}) 
})

router.post('/:cid/productos/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const resp = await CartManager.addProductInCart(parseInt(cid),parseInt(pid))
    res.send({resp}) 
})


module.exports = router