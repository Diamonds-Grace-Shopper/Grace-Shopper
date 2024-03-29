import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Navbar({ user, setUser, history }) {
  function handleLogout() {
    localStorage.removeItem('token')
    setUser({})
    history.push('/')
    alert('You have logged out')
  }

  return (
    <div className='header'>
      <NavLink to='/'>
      <h1 className='brand'>Nice To Meat You</h1>
      </NavLink>
      <nav>
        {user.id ? (
          <div>
            <NavLink to='/Home'>Home</NavLink>
            {
              <a href='#' onClick={handleLogout}>
                Log Out
              </a>
            }
            <NavLink to='/cart'>Cart/Order</NavLink>
          </div>
        ) : (

          <div className='Nav'>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/cart'>Cart/Order</NavLink>
          </div>
        )}
        <div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
