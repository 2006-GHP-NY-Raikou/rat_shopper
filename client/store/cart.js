import axios from 'axios'
import history from '../history'

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

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

export const updateCart = product => ({
  type: UPDATE_CART,
  product
})

export const clearCart = () => ({
  type: CLEAR_CART
})

//thunks are for users who have an Order in the db
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

export const removeFromUserCart = product => async dispatch => {
  try {
    const {data} = await axios.destroy(
      '/api/orders/cart/orderProducts',
      product
    )
    dispatch(removeFromCart(data))
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
    const {data} = await axios.put('/api/orders/cart')
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
      return state.filter(product => product.id !== action.product.id)
    case UPDATE_CART:
      // eslint-disable-next-line no-case-declarations
      let map = state.map(
        product =>
          product.id === action.product.productId
            ? {...product, qty: action.product.qty}
            : product
      )
      return map
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
