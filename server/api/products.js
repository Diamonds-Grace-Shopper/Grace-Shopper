const express = require('express');
const { getAllProducts } = require('../db/products');
const { getProduct } = require('../db/products');
const { createProduct } = require('../db/products');
const { updateProduct } = require('../db/products');
const { destroyProduct } = require('../db/products');

const router = express.Router();

<<<<<<< HEAD
router.get('/', async (req, res) => {
    console.log('Fetching Data')
    let products = await getAllProducts()
    console.log(products)
    res.send( products )
})
=======
>>>>>>> origin/testing-david



module.exports = router