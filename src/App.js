import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin } from './utils'
import './index.css'
import data from './data'

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
