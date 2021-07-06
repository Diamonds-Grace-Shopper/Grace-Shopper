import React from 'react'

export default function Product(props){
  const { product } = props;
  return(
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.image} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2 className='productname'>{product.name}</h2>
        
        </a>
        <div className="price">
          ${product.price}
        </div>
      </div>
    </div>
  )
}