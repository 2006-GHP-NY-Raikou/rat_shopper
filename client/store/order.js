import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

const getOrder = orderId => ({
  type: GET_ORDER,
  orderId
})

const completeOrder = () => ({
  type: COMPLETE_ORDER
})
//if local storage turns up empty, create new order in db,
//fetch it, dispatch it, and finally save the id to local storage for later
export const getOrCreateOrder = () => async dispatch => {
  const savedOrder = JSON.parse(window.localStorage.getItem('order'))
  if (savedOrder) {
    dispatch(getOrder(savedOrder))
  } else {
    try {
      const { data } = await axios.post('/api/order/', { status: false })
      dispatch(getOrder(data.id))
      window.localStorage.setItem('order', JSON.stringify(data.id))
    } catch(err) {
    console.error(err)
    }
  }
}

//state name will be: orderId
export default function(state = null, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.orderId
    default:
      return state
  }
}
