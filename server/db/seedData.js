// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser, createCart, createProduct } = require('./')
const client = require('./client')

async function dropTables() {
  console.log('Dropping All Tables...')
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS products_in_cart;
    DROP TABLE IF EXISTS users;
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
      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        person VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
      CREATE TABLE products_in_cart(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER,
        "productId" INTEGER,
        UNIQUE ("cartId", "productId"),
        CONSTRAINT fk_cart
          FOREIGN KEY ("cartId")
            REFERENCES carts(id),
        CONSTRAINT fk_product
          FOREIGN KEY ("productId")
            REFERENCES products(id)
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

async function createInitialCarts() {
  console.log('creating carts...')
  try {
    const cartsToCreate = [
      { person: 'david' },
      { person: 'zech' },
      { person: 'jingguo' },
      { person: 'marigon' }
    ]

    const carts = await Promise.all(cartsToCreate.map(createCart))
    console.log('done making carts')
    console.log('carts', carts)
  } catch (error) {
    console.error(error)
  }
}

async function createInitialProducts() {
  console.log('creating products')
  try {
    const productsToCreate = [
      { name: 'ribeye'},
      { name: 'new york strip'},
      { name: 'porter'},
      { name: 'dry aged ribeye'},
    ]

    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log('done making products')
    console.log('products', products)
  } catch (error) {
    console.error(error)
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialCarts()
    await createInitialProducts()

    // create other data
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error
  }
}

module.exports = {
  rebuildDB,
}
