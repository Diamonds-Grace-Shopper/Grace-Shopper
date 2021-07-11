// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const { createProduct } = require('./products')
const { createOrder } = require('./orders')
const { addProductToOrder } = require('./orders')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS products_orders CASCADE;
  `)
  } catch (error) {
    throw error
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...')
    // create all tables, in the correct order

    // User's Table
    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        "shippingAddress" VARCHAR(255) NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category TEXT NOT NULL
      );
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id)
      ); 
      CREATE TABLE products_orders (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        quantity INTEGER NOT NULL,
        "unitPrice" DECIMAL NOT NULL,
        UNIQUE ("productId", "orderId")
      );
    `)

    // Add tables as you need them (A good place to start is Products and Orders





    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

    console.log('Finished building tables!')
  } catch (error) {
    console.error('Error building tables!')
    throw error
  }
}

/* 
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log('Starting to create users...')
  try {
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', email: 'albert@gmail.com', shippingAddress: '1337 w michigan ave' },
      { username: 'sandra', password: 'sandra123', email: 'sandra@gmail.com', shippingAddress: '532 n wentworth ave' },
      { username: 'glamgal', password: 'glamgal123', email: 'glamgal@gmail.com', shippingAddress: '1925 s 17th st' },
      { username: 'spongebob', password: 'squarepants', email: 'spongebob@gmail.com', shippingAddress: '324 s pineapple dr' },
      { username: 'patrick', password: 'star', email: 'patrick@gmail.com', shippingAddress: 'under a rock' },
      { username: 'squidward', password: 'tentacles', email: 'squidward@gmail.com', shippingAddress: '325 s pineapple dr' }
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log('Users created:')
    console.log(users)
    console.log('Finished creating users!')
  } catch (error) {
    console.error('Error creating users!')
    throw error
  }
}

async function createInitialProducts() {
  try{
    const productsToCreate = [
      {name:'ribeye', description:'1.5 cut, 14oz ', price:'19.99', category:'beef'},
      {name:'short ribs', description:' 1.5lb ', price:'29.99', category:'beef'},
      {name:'porterhouse', description:'20 oz', price:'37.99', category:'beef'},
      {name:'NY strip', description:'16 oz', price:'24.99', category:'beef'},
      {name:'chicken breast', description:'6 oz', price:'14.99', category:'poultry'},
    ]
    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log('Products created:')
    console.log(products)
    console.log('Finished creating products!')
  }catch(error){
    console.error('Error creating products!')
    throw error
  }
}

async function createInitialOrders() {
  console.log('Starting to create orders...')
  try {
    const ordersToCreate = [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 },
      { userId: 4 },
      { userId: 5 },
      { userId: 6 }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder))

    console.log('Orders created:')
    console.log(orders)
    console.log('Finished creating orders!')
  } catch (error) {
    console.error('Error creating orders!')
    throw error
  }
}

async function createInitialProductsInOrders() {
  console.log('Starting to create products in orders...')
  try {
    const productsOrdersToCreate = [
      { productId:'2', orderId:'1', quantity:'4', unitPrice: '29.99' },
      { productId:'1', orderId:'2', quantity:'3', unitPrice: '19.99' },
    ]
    const products_orders = await Promise.all(productsOrdersToCreate.map(addProductToOrder))

    console.log('Products in orders created:')
    console.log(products_orders)
    console.log('Finished creating products in orders!')
  } catch (error) {
    console.error('Error creating products in orders!')
    throw error
  }
}


async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    
    // create other data

    await createInitialProducts()
    await createInitialOrders()
    await createInitialProductsInOrders()

  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB
}
