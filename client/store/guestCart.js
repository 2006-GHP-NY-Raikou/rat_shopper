import axios from 'axios'

const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
const GUEST_CHECKOUT = 'GUEST_CHECKOUT'

export const getGuestCart = products => ({
  type: GET_GUEST_CART,
  products
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

export const guestCheckout = () => ({
  type: GUEST_CHECKOUT
})

export const guestCheckoutThunk = products => async dispatch => {
  try {
    await axios.post('api/orders/guest/checkout', products)
    dispatch(guestCheckout())
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

export default function(state = [], action) {
  let newState = null
  switch (action.type) {
    case GET_GUEST_CART:
      return action.products
    case ADD_TO_GUEST_CART:
      newState = checkCart(state, action)
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case REMOVE_FROM_GUEST_CART:
      newState = state.filter(product => product.id !== action.productId)
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case UPDATE_GUEST_CART:
      newState = state.map(
        product =>
          product.id === action.product.productId
            ? {...product, qty: action.product.qty}
            : product
      )
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    case GUEST_CHECKOUT:
      window.localStorage.clear()
      return []
    default:
      return state
  }
}
