const express = require('express')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/virtual', express.static(__dirname + '/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars' )


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/views', viewsRouter)


const httpServer = app.listen(PORT, (err) => {
    if (err) return console.log('Error al iniciar el servidor')

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

const io = new Server(httpServer)

const messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado ')

    socket.on('newUser', user =>{
        socket.broadcast.emit('newUserConnected', user)
        io.emit('messageLogs', messages)
    })
    socket.on('message', objectoMensajeCliente => {
        messages.push(objectoMensajeCliente)

        io.emit('messageLogs', messages)
    })
})

