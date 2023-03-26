const express = require('express')
const ProductManager = require ('./productManager.js')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = new ProductManager()



app.get('/productos', async (req, res)=>{  
    let limit = parseInt(req.query.limit);
    let arrayProductos = await productos.getProducts()
    if(!limit){
        res.send(arrayProductos)
    }else{
        const arrayLimitado = arrayProductos.slice(0, limit)
        res.send(arrayLimitado)
    }
    
})

app.get('/productos/:pid', async (req, res)=>{  
    const pid = parseInt(req.params.pid)
    const producto = await productos.getProductById(pid)
    if(producto){
        res.send(producto)
    }else{
        res.status(400).send('No se encontro el producto')
    }
})



app.listen(PORT, (err) => {
    if (err) return console.log('Error al iniciar el servidor')

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})
