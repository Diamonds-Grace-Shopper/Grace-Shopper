import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin } from './utils'
import './index.css'
import data from './data'
import Product from './components/Product'


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
  return (
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
      <div className="grid-container">
  
        <main>
            <div className="row center">
              {
                data.products.map(product =>(
                  <Product key={product._id} product={product}></Product>
                ))
              }
                
                
            </div>
    
        </main>
        <footer className="row center">
            All right reserved
    
        </footer>
    </div>
    </div>
  )
}

export default App
