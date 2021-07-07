const express = require('express')
const router = express.Router()
//import functions from db
const { createOrder, addProductToOrder, getOrderByUserId } = require('../db')

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

//GET /api/orders/
/*router.get('/:orderId', async (req, res, next) => {
    //call function getOrder(userId) and res.send it
    //const { userid } = req.params

    try {
        const order = await getOrderByUserId({ userid })

        res.send({order})
    } catch (error) {
        next(error)
    }
}) */

//create an order for the user when account is first made
router.post('/', async (req, res, next) => {
    const { userId } = req.body
    console.log('body', userId)

    try {
        const order = await createOrder({userId})
        res.send({order})
    } catch (error) {
        console.error('couldnt make order')
    }
}) 

//POST /api/orders/:orderId
//
router.post('/:orderId', async (req, res, next) => {
    //call function getProductById(productId)?
    const { userId } = req.body

    try {
        const order = await getOrderByUserId({ userId })

        //const product = await addProductToOrder(productId, orderId, quantity, unitPrice)
        res.send({
            message: order
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:orderId', (req, res, next) => {
    try {
        //function deleteOrder(orderId)
        res.send({
            message: 'orders'
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router
