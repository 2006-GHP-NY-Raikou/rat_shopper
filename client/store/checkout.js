import axios from 'axios'
import {clearCart} from './cart'
import {guestCheckout as clearGuestCart} from './guestCart'
import {toast} from 'react-toastify'

const CHECKOUT = 'CHECKOUT'

const checkout = orderId => ({
  type: CHECKOUT,
  orderId
})

//creates guest order based on frontend cart
export const guestCheckout = products => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders/guest/checkout', products)
    if (data) {
      toast.success(`checkout success!`)
      dispatch(checkout(data.id))
      dispatch(clearGuestCart())
    } else throw new Error()
  } catch (err) {
    console.error(err)
    toast.error(`user checkout failed`)
  }
}

//updates user order based on what's in db
export const userCheckout = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/cart')
    if (data) {
      toast.success(`checkout success!`)
      dispatch(checkout(data.id))
      dispatch(clearCart())
    } else throw new Error()
  } catch (err) {
    console.error(err)
    toast.error(`guest checkout failed`)
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
