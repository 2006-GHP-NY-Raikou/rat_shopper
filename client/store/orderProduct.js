import axios from 'axios'

const GET_ORDER_PRODUCTS = 'GET_ORDER_PRODUCTS'
const CLEAR_ORDER_PRODUCTS = 'CLEAR_ORDER_PRODUCTS'

const getOrderProducts = products => ({
  type: GET_ORDER_PRODUCTS,
  products
})

export const clearOrderProducts = () => ({
  type: CLEAR_ORDER_PRODUCTS
})

export const fetchOrderProducts = orderId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/${orderId}`)
    dispatch(getOrderProducts(data))
  } catch(err) {
    console.error(err)
  }
}

//state name will be: cart
export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return action.products
    case CLEAR_ORDER_PRODUCTS:
      return []
    default:
      return state
  }
}