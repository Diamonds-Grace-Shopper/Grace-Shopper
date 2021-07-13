import React from 'react';
import './Cart.css';

export default function Cart(props) {
    const { cartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
      <aside className="block col-3">
        <h2>Cart Items</h2>
        <div>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            <div key={item.id} className="row-c">
              <div className="col-4">{item.name}</div>
              <div className="col-4">
                <button onClick={() => onRemove(item)} className="remove">
                  -
                </button>{' '}
                <button onClick={() => onAdd(item)} className="add">
                  +
                </button>
              </div>
  
              <div className="col-4 text-right">
                {item.qty} x ${item.price}
              </div>
            </div>
          ))}
  
          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="row-c">
                <div className="col-4">Items Price</div>
                <div className="col-3 text-right">${itemsPrice.toFixed(2)}</div>
              </div>
              <div className="row-c">
                <div className="col-4">Tax Price</div>
                <div className="col-3 text-right">${taxPrice.toFixed(2)}</div>
              </div>
              <div className="row-c">
                <div className="col-4">Shipping Price</div>
                <div className="col-3 text-right">
                  ${shippingPrice.toFixed(2)}
                </div>
              </div>
  
              <div className="row-c">
                <div className="col-4">
                  <strong>Total Price</strong>
                </div>
                <div className="col-3 text-right">
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <hr />
              <div className="row-c">
                <button onClick={() => alert('Add payment!')}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    );
  }