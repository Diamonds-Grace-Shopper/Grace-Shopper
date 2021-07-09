import axios from 'axios'

function setHeaders() {
  let token = localStorage.getItem('token')
  let config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {}
  return config
}

/**
 * If logged on returns user data and json web token.  If not logged on, an error will be thrown
 * And no data will be returned
 *
 * @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function checkLogin() {
  try {
    let { data } = await axios.get('/api/users/me', setHeaders())
    // if data has an id and user the user is logged on
    delete data.password
    return data
  } catch (err) {
    console.log('checkLogin(): User is not logged on.\n', err)
    return err
  }
}

/**
 *  Login
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function login(username, password) {
  try {
    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    })
    if (data.token) {
      setToken(data.token)
    }
    console.log('login', data)
    return data
  } catch (err) {
    console.error('login(): Unable to login.\n', err)
    // returns error to be handled.
    return err
  }
}

/**
 *  Register
 *
 *  @param username - Name of the user
 *  @param password - Users' password
 *
 *  @returns {
 *      user: {
 *          username: String,
 *          password: String
 *      },
 *      token: JSonWebToken
 *  }
 */
export async function register(username, password, email, shippingAddress) {
  try {
    const { data } = await axios.post('/api/users/register', {
      username,
      password,
      email,
      shippingAddress
    })
    if (data.token) {
      setToken(data.token)
    }

    data.status = 'register'
    console.log('register', data)
    return data
  } catch (err) {
    console.error('register(): Unable to register user.\n', err)
    // returns error to be handled
    return err
  }
}

function setToken(token) {
  localStorage.setItem('token', token)
}

/////////////////////////////
export async function createOrder(userId) {
  try {
    const { data } = await axios.post('/api/orders', {
      userId
    })
    console.log('utils', data)
    return data
  } catch (error) {
    console.error
  }
}

export async function getOrderByUserId(user) {
  const id = user.id
  //console.log('utils', id)
  try {
    const { data } = await axios.get(`/api/users/${id}/orders`)

    //console.log('getOrder', data)
    return data
  } catch (error) {
    console.error('couldnt get order')
  }
}

export async function addProductToOrder(productId, orderId, quantity, unitPrice) {
  productId = Number(productId)
  unitPrice = Number(unitPrice)

  try {
    console.log('parameters', productId, orderId, quantity, unitPrice)
    const { data } = await axios.post(`/api/orders/${orderId}`, {
      productId,
      orderId,
      quantity,
      unitPrice
    })
    return data
  } catch (error) {
    console.error('can not add to cart')
  }
}

export async function removeProductFromOrder(productId, orderId) {
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      productId,
      orderId
    })
    console.log('product delete', data)
    return data
  } catch (error) {
    console.error('could not delete product')
  }
}

export async function changeProductQuantityInOrder(productId, orderId, quantity) { 
  try {
    const { data } = await axios.patch(`/api/orders/${orderId}`, {  
      productId,
      orderId,
      quantity
    })

    return data
  } catch (error) {
    console.error('could not update cart')
  }
}

export async function getProductsInOrder(orderId) {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`)

    return data
  } catch (error) {
    console.error('could not get products in order')
  }
}