import React from 'react';
import data from '../data'
import Product from '../components/Product'



export default function ProductScreen(props){
  const { onAdd } = props;
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
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <div className="row">
                <div>Price</div>
                <div className="price">${ product.price}</div>
              </div>
            </li>
            <li>
            </li>

          </ul>
        </div>

      </div>

    </div>
  </div>;
}