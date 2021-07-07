const express = require('express')
const router = express.Router()
//import functions from db
const { addProductToOrder, getOrderByUserId } = require('../db')

//testing route
/*router.get('/', (req, res, next) => {
    try {
        res.send({
            message: 'orders'
        })
    } catch (error) {
        next(error)
    }
}) */

//GET /api/orders/
router.get('/', async (req, res, next) => {
    //call function getOrder(userId) and res.send it
    const { userid } = req.body

    try {
        const order = await getOrderByUserId({ userid })
        res.send({order})
    } catch (error) {
        next(error)
    }
})

//POST /api/orders/:orderId
router.post('/:orderId', async (req, res, next) => {
    //call function getProductById(productId)?
    try {
        const product = await addProductToOrder(productId, orderId, quantity, unitPrice)
        res.send({
            message: 'orders'
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
