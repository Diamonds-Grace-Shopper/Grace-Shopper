import React, { useState } from 'react'
import axios from 'axios'
import { login, register, createOrder } from '../utils'
import './AuthForm.css'

function AuthForm(props) {
  let { type, setUser } = props // type of auth form (login or signup) and isLoggedIn Function
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(evt) {
    evt.preventDefault()

    if (!username || !password) {
      return // need to fill out username and password
    } else {
      try {
        let data =
          type === 'login'
            ? await login(username, password)
            : await register(username, password, email)
        if (data.status === 'register') {
          await createOrder(data.user.id)
          setUsername('')
          setPassword('')
          setEmail('')
          await setUser(data.user)
          props.history.push('/home') // send it home
          alert('Your account has been made!')
        } else if (data.user) {
          setUsername('')
          setPassword('')
          await setUser(data.user)
          props.history.push('/home')
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
      {type === 'register' ? (
        <div>
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
        </div>
      ) : null }
      <button type='submit'>{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  )
}

export default AuthForm
