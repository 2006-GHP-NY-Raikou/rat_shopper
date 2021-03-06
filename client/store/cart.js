/* eslint-disable complexity */
import axios from 'axios'
import {toast} from 'react-toastify'

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

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
    toast.error(`something went wrong :O`, {position: 'top-left'})
  }
}

export const addToUserCart = product => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/cart`, product)
    if (data) {
      toast.success(`added to cart!`, {position: 'top-left'})
      dispatch(addToCart(data))
    } else throw new Error()
  } catch (err) {
    console.error(err)
    toast.error(`couldn't add to cart`, {position: 'top-left'})
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
    toast.info(`removed from cart`, {position: 'top-left'})
  } catch (err) {
    console.error(err)
    toast.error(`something went wrong :O`, {position: 'top-left'})
  }
}

export const updateUserCart = product => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart/orderProducts', product)
    dispatch(updateCart(data))
  } catch (err) {
    console.error(err)
    toast.error(`something went wrong :O`, {position: 'top-left'})
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

//state name will be: cart
export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.products
    case ADD_TO_CART:
      return [...state, action.product]
    case REMOVE_FROM_CART:
      return state.filter(product => product.id !== action.productId)
    case UPDATE_CART:
      return state.map(
        product =>
          product.id === action.product.productId
            ? {...product, qty: action.product.qty}
            : product
      )
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
