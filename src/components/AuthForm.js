import React, { useState } from 'react'
import axios from 'axios'
import { login, register, createOrder } from '../utils'

function AuthForm(props) {
  let { type, setUser } = props // type of auth form (login or signup) and isLoggedIn Function
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  async function handleSubmit(evt) {
    evt.preventDefault()

    if (!username || !password) {
      return // need to fill out username and password
    } else {
      try {
        let data =
          type === 'login'
            ? await login(username, password)
            : await register(username, password, email, shippingAddress)
        if (data.user) {
          console.log('data', data)
          console.log('user id', data.user.id)
          await createOrder(data.user.id)
          setUsername('')
          setPassword('')
          setEmail('')
          setShippingAddress('')
          await setUser(data.user)
          props.history.push('/home') // send it home
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form className='AuthForm' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          value={username}
          type='text'
          placeholder='Type your username'
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          value={password}
          type='text'
          placeholder='Type your password'
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          value={email}
          type='text'
          placeholder='Type your email'
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div>
        <label htmlFor='shippingAddress'>Shipping Address:</label>
        <input
          id='shipping-address'
          value={shippingAddress}
          type='text'
          placeholder='Type your shipping address'
          onChange={(evt) => setShippingAddress(evt.target.value)}
        />
      </div>
      <button type='submit'>{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  )
}

export default AuthForm
