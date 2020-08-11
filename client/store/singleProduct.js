import axios from 'axios'
import history from '../history'

const SELECT_PRODUCT = 'SELECT_PRODUCT'

const initialState = {}

export const selectProduct = product => {
  return {
    type: SELECT_PRODUCT,
    product
  }
}

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(selectProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (productId, updatedProduct) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${productId}`, updatedProduct)
      dispatch(fetchSingleProduct(productId))
      history.push(`/products/${productId}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.product
    default:
      return state
  }
}
