
import { React, useState } from 'react';
import data from '../data'
import { addProductToOrder, checkLogin, getOrderByUserId } from '../utils'
import { Link } from 'react-router-dom';

import Product from '../components/Product'


export default function ProductScreen(props){
  const {onAdd} = props
  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const user = await checkLogin()
      const order = await getOrderByUserId(user)
      const productId = product._id
      const orderId = order.order[0].id
      const productToAdd = await addProductToOrder(productId, orderId, 1, '1.99')
      console.log('product', productToAdd)
    } catch (error) {
      console.error
    }
  }

  const product = data.products.find((x) => x._id === props.match.params.id);

  if(!product){
    return (<div>Product Not Found</div>)
  }


  return (
  <div>
    <Link to="/">Back to result</Link>
    <div className="row top">

      <div className="col-2">
        <img className="large" src={product.image} alt={product.name}></img>

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
                <div className="price">
                  ${ product.price }
                </div>
              </div>
            </li>
            <li>
              <button type="submit" className="primary block">Add to Cart</button>
            </li>

          </ul>
        </div>

      </form>

    </div>
  </div>);
}