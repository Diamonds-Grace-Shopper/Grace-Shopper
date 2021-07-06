// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const { createProduct } = require('./products')
const { createOrders } = require('./orders')
const { createProductToOrders } = require('./orders')
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
        password VARCHAR(255) NOT NULL
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
        status varchar(255) NOT NULL,
        orderQuantity INTEGER DEFAULT 0,
        date VARCHAR(10),
        time VARCHAR(8), 
        total DECIMAL NOT NULL,
        userId INTEGER REFERENCES users(id)
      ); 
      CREATE TABLE products_orders (
        jointId SERIAL PRIMARY KEY,
        productId INTEGER REFERENCES products(id),
        orderId INTEGER REFERENCES orders(id),
        quantity INTEGER NOT NULL,
        unitPrice DECIMAL NOT NULL
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
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
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
      { status: 'stock', orderQuantity: '1', date: '', time: '', total: '19.99', userId: '2' },
      { status: 'stock', orderQuantity: '2', date: '', time: '', total: '29.99', userId: '1' },
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrders))

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
      { productId:'2', orderId:'1', quantity:'4', unitPrice: 19.67 },
      { productId:'1', orderId:'2', quantity:'3', unitPrice: 29.99 },
    ]
    const products_orders = await Promise.all(productsOrdersToCreate.map(createProductToOrders))

    console.log('Producta in orders created:')
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
