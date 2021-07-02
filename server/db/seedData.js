// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require('./')
const { createProduct } = require('./products')
const { createCarts } = require('./carts')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS carts CASCADE;
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
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        status varchar(255) NOT NULL,
        cartQuantity INTEGER DEFAULT 0,
        date VARCHAR(10),
        time VARCHAR(8), 
        total DECIMAL NOT NULL,
        userId INTEGER REFERENCES users(id)
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

async function createInitialCarts() {
  console.log('Starting to create carts...')
  try {
    const cartsToCreate = [
      { status: 'stock', cartQuantity: '1', date: '6/6/21', total: '19.99', userId: '2' },
      { status: 'stock', cartQuantity: '2', date: '7/1/21', total: '29.99', userId: '1' },
    ]
    const carts = await Promise.all(cartsToCreate.map(createCarts))

    console.log('Carts created:')
    console.log(carts)
    console.log('Finished creating carts!')
  } catch (error) {
    console.error('Error creating carts!')
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
    await createInitialCarts()

  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB
}
