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
        email VARCHAR(255) NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL
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
      { username: 'albert', password: 'bertie99', email: 'albert@gmail.com' },
      { username: 'sandra', password: 'sandra123', email: 'sandra@gmail.com' },
      { username: 'glamgal', password: 'glamgal123', email: 'glamgal@gmail.com' },
      { username: 'spongebob', password: 'squarepants', email: 'spongebob@gmail.com' },
      { username: 'patrick', password: 'star', email: 'patrick@gmail.com' },
      { username: 'squidward', password: 'tentacles', email: 'squidward@gmail.com' }
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

      {
        id: '1',
        name: 'Prime Porterhouse, Wet Aged 20oz',
        price: '38',
        description: 'Indeed the very best of both worlds, this is one hearty steak. On one side, a tender Filet Mignon; on the other side, an intensely flavorful NY Strip.  Doesn’t get much better than this! Wet aged.',
        category: 'beef',
        image: '/images/image_11.jpeg'
      },
      {
        id: '2',
        name: 'Filet - Prime, Wet Aged 10oz',
        price: '34',
        description: 'This is the most incredibly tender, buttery texture that is center cut from a pristine tenderloin and crafted by hand. Subtly marbled that enhances an even greater depth of flavor.  If you’ve been wanting a filet that will literally melt in your mouth- you found it! ',
        category: 'beef',
        image: '/images/image_21.jpg'
      },
      {
        id: '3',
        name: '14 oz Bone-In Filet Prime, Wet Aged',
        price: '42',
        description: 'If you love tenderloin steak, you’ll love our USDA Prime Bone In Filet Mignon. Aged to perfection, this beef cut has a mild flavor and superior buttery texture, making it an excellent choice for special occasion dinners. The steak is hand-selected and hand-cut with precision by veteran butchers and wet aged a minimum of 21 days to enhance steak flavor and texture.',
        category: 'beef',
        image: '/images/image_31.png'
      },
      {
        id: '4',
        name: 'NY Strip - Prime, Wet Aged 16oz',
        price: '38',
        description: 'A steakhouse staple. Sourced from the short loin, the strip is another tender cut of beef. A cut favored for its beefy flavor, our Strip Steaks are center cut, (no tough tendons here), and offer a bit less marbling than a Ribeye. All while providing a cut that is incredibly tender & flavorful. ',
        category: 'beef',
        image: '/images/image_41.jpg'
      },
      {
        id: '5',
        name: 'NY Strip - Prime, Dry Aged 16oz',
        price: '36',
        description: 'A cut favored for its beefy flavor, our Strip Steaks are center-cut, (no tough tendons here), and offer less marbling than a Ribeye, while providing just enough to produce a cut that is incredibly tender, rich & flavorful. Its fine marbling and 41-day aging results in a more pronounced, nuttier flavor.',
        category: 'beef',
        image: '/images/image_51.jpg'
      },
      {
        id: '6',
        name: 'Boneless Ribeye - Prime, Wet Aged 16oz',
        price: '31',
        description: 'The Ribeye gets such high praise because it’s the most well-marbled of all the steaks and tender to boot. We handcraft this steak to showcase the brilliantly marbled center, including a nice “Rib Eye Cap” on one end which is loaded with delicious flavor. ',
        category: 'beef',
        image: '/images/image_61.jpg'
      },
      {
        id: '7',
        name: '36 oz Tomahawk Prime, Wet Aged',
        price: '64',
        description: 'Our Happy To Meat You Prime Tomahawk Ribeye is a true stand out.   Essentially an incredibly flavorful, tender and well marbled ribeye steak, this grand dame of the beef world is specifically cut with at least five inches of rib bone left intact and can feed 2-3 people.  Perfect any time, but especially when served at your next dinner party or grilling event or even as an ever so welcomed gift of great taste!',
        category: 'beef',
        image: '/images/image_71.jpg'
      },
      {
        id: '8',
        name: 'Chicken Breasts - 2 * 6oz',
        price: '14',
        description: 'Our chicken comes from the heart of Ohio’s Amish coutntry via Gerber’s Amish Farm,  where they have been raising better tasting chicken for over 6 decades. Never treated with hormones or antibiotics, 100% vegetarian diet.  (2) 6 oz  Chicken Breasts packaged per single order.',
        category: 'chicken',
        image: '/images/image_81.jpg'
      },
      {
        id: '9',
        name: 'New Zealand Lamb Rack',
        price: '44',
        description: 'Our New Zealand 2 lb, 8 rib rack is raised solely on pasture. No hormones or antibiotics are used. New Zealand Lamb is an ideal choice for today’s high-energy lifestyles. It is low in calories, fat and cholesterol, and high in protein, b vitamins, zinc, and iron. Its rich, yet mild, non gamey, buttery flavor, lends itself to any number of cooking methods, from grilling to braising. ',
        category: 'lamb',
        image: '/images/image_91.jpg'
      },
      {
        id: '10',
        name: 'Lamb Loin Chops ',
        price: '64',
        description: 'Premium grass fed lamb from selected ranches in Colorado.  Great pan-seared, sauteed or prepared on the grill. Loin chops are  great pan-seared, sautéed or prepared on the grill.',
        category: 'lamb',
        image: '/images/image_101.jpg'
      },
      {
        id: '11',
        name: 'Pork Chops 2 * 8oz Center Cut',
        price: '8',
        description: 'Like well-marbled ribeye steaks, pork needs marbling, not water and sodium solutions. These 2, 8 oz center cut chops have natural marbling, making it naturally juicy and delicious.  For those more concerned with presentation, select our 12oz “Frenched” chop with a trimmed bone. ',
        category: 'pork',
        image: '/images/image_111.jpg'
      },
      {
        id: '12',
        name: 'Gourmet Sliced Bacon (2.5 lbs)',
        price: '23',
        description: 'From the heart of Chicago with history tied back to the Union Stockyards, this gourmet, thick sliced bacon has been naturally cured and smoked, delivering uncompromising flavor.  This is the same bacon delivered to many of the top restaurants around the great states.  Now you can experience this luxurious cut for yourself, direct to your door. ',
        category: 'pork',
        image: '/images/image_121.jpg'
      },
      {
        id: '13',
        name: 'Wild Caught Halibut - 2lb Box',
        price: '50',
        description: 'Delicate, firm white sweet flesh, there’s no question as to why these are fly fish’n out the door! , Our fresh, wild caught & hand trimmed halibut is as good as it gets. These boneless, skinless individually sealed 8oz portions are super convenient and the best way to store.  Hand cut and flash frozen for the freshest flavor. ',
        category: 'seafood',
        image: '/images/image_131.jpg'
      },
      {
        id: '14',
        name: 'Fresh, Wild Caught Sea Bass - 2lb Box',
        price: '66',
        description: 'This chef-prized fish is known for its high-fat content and velvety mouthfeel.  Sea Bass has a rich, melt in your mouth texture. With its white flesh and flaky meat, you can use this in just about any white fish recipe. It accepts all spices and forgives very easy with any cooking method. Wild caught, hand cut and individually flash frozen in 8oz portions.',
        category: 'seafood',
        image: '/images/image_141.jpg'
      },
      {
        id: '15',
        name: 'Salmon - 2lb Box',
        price: '34',
        description: 'Whether it’s a quick sear, roast or poach, our  #1 quality salmon is sustainably farm raised on the Canadian coast and are ready to impress.  The fresh Salmon portions are 4, 8oz and each portion is individually vacuum packaged.',
        category: 'seafood',
        image: '/images/image_151.jpg'
      },
      {
        id: '16',
        name: 'Fresh, Wild Caught Tuna (A1 Grade, 2lb Box. 4 - 8oz pieces)',
        price: '70',
        description: 'Fresh from Hawaii’s waters, our Wild-Caught yellowfin tuna is a highly sought after fish all over the world.  At the highest grade possible, A1, the deep red, fatty meat is recognizable anywhere. When raw or lightly seared, yellowfin tuna adds a vibrant splash of appetizing color to any dish. You can enjoy it all on its own as an entree, or as a lean protein addition to salads, rice bowls, and sushi rolls.   ',
        category: 'seafood',
        image: '/images/image_161.jpg'
      },
      {
        id: '17',
        name: 'Caribbean Lobster Tails (2, 8oz )',
        price: '49',
        description: 'From the pristine, warm, crystal clear waters of the Caribbean, these sweet warm water lobster tails are packed with meat and certain to satisfy your craving for the ultimate tail flavor experience. Sweeter than their cold water counterparts, warm water Lobster Tails offer sweet, succulent meat and help create amazing plate presentations. Perfect whether grilled, baked, broiled or steamed. Our Lobster Tails are caught fresh and immediately flash frozen to insure the ultimate flavor and texture. ',
        category: 'seafood',
        image: '/images/image_171.jpg'
      },
      {
        id: '18',
        name: '18 oz T-Bone - Prime, Wet Aged',
        price: '30',
        description: 'A junior version our Porterhouse, yet still the best of both worlds with a succulent NY Strip on one side and a tender, melt in your mouth filet on the other. Bone appetite!   ',
        category: 'beef',
        image: '/images/image_181.jpg'
      },
      {
        id: '19',
        name: 'The Mother Chucker Prime Burger(Pack of 2; 8oz each)',
        price: '9',
        description: 'A Happy To Meat You (HTMY) exclusive! This is a carefully balanced blend of Prime Chuck & Outside Skirt to produce one of the most incredibly flavorful burgers ever! With the buttery flavor profile from our outside skirt and our quality prime chuck, we’ve personally created the best, most juiciest burger on earth. This bodacious blend is guaranteed NOT to dry out on the grill. Extra napkins not included.  (2) 8oz burgers per pack.',
        category: 'beef',
        image: '/images/image_191.jpg'
      },
  
      {
        id: '20',
        name: '2 Rib Baby Back (2lbs each)',
        price: '30',
        description: 'The centerpiece of your next BBQ!  With 4lbs to work with, these meaty, juicy, and deliciously tender baby backs are sure to impress. (2) Racks (2) lbs each',
        category: 'beef',
        image: '/images/image_201.jpg'
      }
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
