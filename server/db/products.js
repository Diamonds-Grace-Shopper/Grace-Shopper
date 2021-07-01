const client = require('./client');

async function createProduct({name,description,price,category}) 
{
  try{
    console.log(name)
    const {rows: [ product ] } = await client.query(
    `
    INSERT INTO products(name, description, price, category)
    VALUES($1, $2, $3, $4)
    ON CONFLICT (name) DO NOTHING
    RETURNING *
    `, 
    [name, description, price, category])

    return product
  }catch(error){
    throw error
  }
};

// async function getAllProducts(){
//   try{
//     const{ rows } = await client.query(`
//     SELECT *
//     FROM products;
    
//     `);
//     return rows
//   }catch(error){
//     throw error;
//   }
// }



// async function getProduct(id){
//   try{
//     const {rows : [ product ]} = await client.query(`
//     SELECT *
//     FROM products
//     WHERE id=${ id }
    
    
//     `);
//     return product
//   }catch(error){
//     throw error;
//   }
// }



// async function updateProduct(id, fields = {}){
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index +1}`
//   ).join(', ');

//   if (setString.length === 0){
//     return;
//   }
//   try{
//     const { rows: [ product ] } = await client.query(`
//     UPDATE products
//     SET ${ setString }
//     WHERE id=${ id }
//     RETURNING *;
//     `, Object.values(fields));

//     return product
//   }catch(error){
//     throw error
//   }
// }

// async function destroyProduct(id){
//   try{
//     await client.query(`
//     DELETE FROM products
//     WHERE id=${ id };
//     `, [id]);
//   }catch(error){
//     throw error;
//   }
// }






module.exports = {
  // getAllProducts,
  // getProduct,
  createProduct
  // updateProduct,
  // destroyProduct

}