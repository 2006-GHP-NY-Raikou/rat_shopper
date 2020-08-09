import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

export const getAllUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
