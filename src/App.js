import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin } from './utils'
import './index.css'

import { BrowserRouter, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Cart from './components/Cart'


function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const setLogIn = async () => {
      let data = await checkLogin()
      if (data.id) {
        setUser(data)
      }
    }
    setLogIn()
  }, [])
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    console.log('Starting onRemove function')
    const exist = cartItems.find((x) => x.id === product._id);
    if (exist === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
    console.log('This is how onRemove looks like', cartItems)
  };
  return (

    <BrowserRouter>
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />

      <div className="grid-container">          
  
        <main>
          <Route exact path="/product/:id" component={ProductScreen} ></Route>
          <Route exact path="/" render={() => (<HomeScreen onAdd={onAdd}/>)} ></Route>
          <Route path="/cart" render={() => 
            (<Cart 
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}/>)}></Route>
        </main>
        <footer className="row center">
            All right reserved
    
        </footer>
    </div>
    </div>
    </BrowserRouter>
  )
}

export default App
