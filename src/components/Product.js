import React from 'react'

export default function Product(props){
  const { product, onAdd } = props;

  function addToCartAlert(event) {
    event.preventDefault()
    onAdd(product)
    alert(`${product.name} has been added to the cart`)
  }

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
          <button className="primary block" onClick={(event) => addToCartAlert(event)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}