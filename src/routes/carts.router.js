const express = require('express')
const {CartManager} = require("../Managers/cartsManager")

const router = express.Router()
let cartManager = new CartManager

router.post("/", async (req,res)=>{
    const resp = await cartManager.createCart(req.body.products ? req.body : {products: []})
    res.send({resp}) 
})

router.get("/", async(req,res)=>{
    const resp = await cartManager.leerArchivo()
    res.send(resp)
})

router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const resp = await cartManager.getCartById(parseInt(cid))
    res.send({resp}) 
})

router.post('/:cid/productos/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const resp = await cartManager.addProductInCart(parseInt(cid),parseInt(pid))
    res.send({resp}) 
})


module.exports = router