const express = require('express');
const axios = require('axios');
const { SERVER_ADDRESS = 'http://localhost:', PORT = 5000} = process.env;
const API_URL = process.env.API_URL || SERVER_ADDRESS + PORT;
const { getAllProducts } = require('../db/products');
const { getProduct } = require('../db/products');
const { createProduct } = require('../db/products');
const { updateProduct } = require('../db/products');
const { destroyProduct } = require('../db/products');

const { rebuildDB, testDB } = require('../db/seedData');
const { client } =require('../db');
const { useState } = require('react');

const router = express.Router();

app.get('/', (req, res) => {
    res.send( getAllProducts)
})

app.get('/', (req, res) => {
    res.send( getProduct )
})

app.get('/', (req, res) => {
    res.send( createProduct)
})

app.get('/', (req, res) => {
    res.send( updateProduct )
})

app.get('/', (req, res) => {
    
    res.send( destroyProduct )
})



// useState( () => {
//     const fetchProducts = async () => {
//         const res = await fetch('./db/seedData')
//     }
// })

