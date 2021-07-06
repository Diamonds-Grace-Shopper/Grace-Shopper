const express = require('express')
const router = express.Router()
//import functions from db

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

//GET /api/orders/:orderId
router.get('/:orderId', (req, res, next) => {
    //call function getOrder(userId) and res.send it
    try {
        res.send({
            message: 'orders'
        })
    } catch (error) {
        next(error)
    }
})

//POST /api/orders/:orderId
router.post('/:orderId', (req, res, next) => {
    //call function getProductById(productId)?
    try {
        //function addProductToOrders(productId)
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
