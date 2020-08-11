import axios from 'axios'
import {clearCart} from './cart'
import {guestCheckout as clearGuestCart} from './guestCart'

const CHECKOUT = 'CHECKOUT'

const checkout = orderId => ({
  type: CHECKOUT,
  orderId
})

//creates guest order based on frontend cart
export const guestCheckout = products => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders/guest/checkout', products)
    dispatch(checkout(data.id))
    dispatch(clearGuestCart())
  } catch (err) {
    console.error(err)
  }
}

//updates user order based on what's in db
export const userCheckout = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart')
    dispatch(checkout(data.id))
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

//holds most recent order # for completed order
export default function(state = null, action) {
  switch (action.type) {
    case CHECKOUT:
      window.localStorage.clear()
      return action.orderId
    default:
      return state
  }
}
