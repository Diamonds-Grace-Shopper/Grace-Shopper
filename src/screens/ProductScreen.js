import { React, useState } from 'react';
import data from '../data'
import { addProductToOrder, checkLogin, getOrder } from '../utils'
import Product from '../components/Product'



export default function ProductScreen(props){
  //const [product, setProduct] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const user = await checkLogin() //might need to switch this out later
      //await addToOrder(product._id)
      console.log('product id', product._id)
      console.log('user id', user.id)
      const order = await getOrder(user)
      console.log('order', order)
      //console.log('user id')
    } catch (error) {
      console.error
    }
  }

  const product = data.products.find((x) => x._id === props.match.params.id);
  if(!product){
    return <div>Product Not Found</div>
  }

  return <div>
    <div className="row">
      <div className="col-2">
        <img src={product.image} alt={product.name}></img>

      </div>
      <div className="col-1">
        <ul>
          <li>
            <h1>{ product.name }</h1>
          </li>
          <li>Price : ${product.price}</li>
          <li>
            Description:
            <p>{ product.description }</p>
          </li>
        </ul>

      </div>
      <form className="col-1" onSubmit={handleSubmit}>
        <div className="card card-body">
          <ul>
            <li>
              <div className="row">
                <div>Price</div>
                <div className="price">${ product.price}</div>
              </div>
            </li>
            <li>
              <button type="submit" className="primary block">Add to Cart</button>
            </li>

          </ul>
        </div>

      </form>

    </div>
  </div>;
}