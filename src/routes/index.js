const {Router} = require ('express')
const usersRouter = require('./users.router.js')
const productsRouter = require('./products.router.js')
const cartsRouter = require('./carts.router.js')
const viewsRouter = require('./views.router.js')


const router = Router()

router.use('/api/users', usersRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/views', viewsRouter)



module.exports = router