const express = require('express');
const { getAllProducts } = require('../db/products');
const { getProduct } = require('../db/products');
const { createProduct } = require('../db/products');
const { updateProduct } = require('../db/products');
const { destroyProduct } = require('../db/products');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Fetching Data')
    let products = await getAllProducts()
    console.log(products)
    res.send( products )
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params //axios call variable
    let product = await getProduct( productId )
    console.log(product)
    res.send( product )
})



module.exports = router