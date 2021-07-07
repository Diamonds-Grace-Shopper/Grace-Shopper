import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { checkLogin } from './utils'
import './index.css'

import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'



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

    <BrowserRouter>
    <div className='App'>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />

      <div className="grid-container">
  
        <main>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
            
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
