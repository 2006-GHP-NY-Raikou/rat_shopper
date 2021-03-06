import axios from 'axios'

const GET_SINGLE_USER = 'GET_SINGLE_USER'
const CLEAR_SINGLE_USER = 'CLEAR_SINGLE_USER'

const getSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
})

export const clearSingleUser = () => ({
  type: CLEAR_SINGLE_USER
})

export const getSingleUserThunk = userId => async dispatch => {
  try {
    // const { data } = await axios.get(`/api/users/${userId}`)
    const [user, userOrders] = await Promise.all([
      axios.get(`/api/users/${userId}`),
      axios.get(`/api/users/${userId}/orders`)
    ])
    let orders = userOrders.data.reduce(
      (acc, order) => [...acc, ...order.products],
      []
    )
    user.data.pastPurchases = orders
    dispatch(getSingleUser(user.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    case CLEAR_SINGLE_USER:
      return {}
    default:
      return state
  }
}
