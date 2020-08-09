import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const CLEAR_CART = 'CLEAR_CART'

const getCart = products => ({
  type: GET_CART,
  products
})

const addToGuestCart = product => ({
  type: ADD_TO_GUEST_CART,
  product
})

export const clearCart = () => ({
  type: CLEAR_CART
})

export const fetchUserCart = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/cart`)
    dispatch(getCart(data))
  } catch(err) {
    console.error(err)
  }
}

//state name will be: cart
export default function(state = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.products
    case CLEAR_CART:
      return []
    default:
      return state
  }
}