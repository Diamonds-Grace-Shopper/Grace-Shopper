const express = require('express')
const router = express.Router()
//import functions from db
const { createOrder, addProductToOrder, deleteProductFromOrder, getProductsByOrderId } = require('../db')

//testing route
router.get('/', (req, res, next) => {
    try {
        res.send({
            message: 'orders'
        })
    } catch (error) {
        next(error)
    }
})

//GET /api/orders/:order
router.get('/:order', async (req, res, next) => {
    const { order } = req.params

    try {
        const productsInOrder = await getProductsByOrderId(order)

        res.send({ productsInOrder })
    } catch (error) {
        console.error('GET api')
        next(error)
    }
})

//create an order for the user when account is first made
router.post('/', async (req, res, next) => {
    const { userId } = req.body
    console.log('body', userId)

    try {
        const order = await createOrder({userId})
        res.send(order)
    } catch (error) {
        console.error('couldnt make order')
    }
}) 

//POST /api/orders/:order
//add product to products_orders
router.post('/:order', async (req, res, next) => {
    const { productId, orderId, quantity, unitPrice } = req.body
    
    try {
        const product = await addProductToOrder({productId, orderId, quantity, unitPrice})
        res.send({ product })
    } catch (error) {
        next(error)
    }
})

router.delete('/:order', async (req, res, next) => {
    const { productId, orderId } = req.body

    try {
        const deletedProduct = await deleteProductFromOrder({productId, orderId})
        res.send({ deletedProduct })
    } catch (error) {
        next(error)
    }
})


module.exports = router
