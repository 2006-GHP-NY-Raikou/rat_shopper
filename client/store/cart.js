/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'

export const getCart = products => ({
  type: GET_CART,
  products
})

export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})

export const updateCart = product => ({
  type: UPDATE_CART,
  product
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const addToGuestCart = product => ({
  type: ADD_TO_GUEST_CART,
  product
})

export const updateGuestCart = product => ({
  type: UPDATE_GUEST_CART,
  product
})

export const removeFromGuestCart = productId => ({
  type: REMOVE_FROM_GUEST_CART,
  productId
})

// thunks are for users who have an Order in the db
export const fetchUserCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart`)
    const products = data.products.map(product => {
      product.qty = product.orderProduct.qty
      product.priceAtPurchase = product.orderProduct.priceAtPurchase
      return product
    })
    dispatch(getCart(products))
  } catch (err) {
    console.error(err)
  }
}

export const addToUserCart = product => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/cart`, product)
    dispatch(addToCart(data))
    history.push('/cart')
  } catch (err) {
    console.error(err)
  }
}

export const removeFromUserCart = productId => async dispatch => {
  try {
    await axios.delete('/api/orders/cart/orderProducts', {
      headers: {
        Authorization: 'token'
      },
      data: {
        productId
      }
    })
    dispatch(removeFromCart(productId))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserCart = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart/orderProducts', product)
    dispatch(updateCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = () => async dispatch => {
  try {
    await axios.put('/api/orders/cart')
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

//checks if item is already in guest cart, updates if y, adds if n
const checkCart = (state, action) => {
  if (state.length) {
    const item = state.findIndex(product => product.id === action.product.id)
    if (item >= 0) {
      let newState = [...state]
      newState[item].qty += action.product.qty
      return newState
    }
  }
  return [...state, action.product]
}

//updates guest cart

//state name will be: cart
export default function(state = [], action) {
  let newState = null
  switch (action.type) {
    case GET_CART:
      return action.products
    case ADD_TO_GUEST_CART:
      newState = checkCart(state, action)
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case ADD_TO_CART:
      return [...state, action.product]
    case REMOVE_FROM_CART:
      return state.filter(product => product.id !== action.productId)
    case REMOVE_FROM_GUEST_CART:
      newState = state.filter(product => product.id !== action.productId)
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case UPDATE_CART:
      return state.map(
        product =>
          product.id === action.product.productId
            ? {...product, qty: action.product.qty}
            : product
      )
    case UPDATE_GUEST_CART:
      newState = state.map(
        product =>
          product.id === action.product.productId
            ? {...product, qty: action.product.qty}
            : product
      )
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case CLEAR_CART:
      window.localStorage.clear()
      return []
    default:
      return state
  }
}
