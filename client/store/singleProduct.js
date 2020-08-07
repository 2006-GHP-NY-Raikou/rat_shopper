import axios from 'axios'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

const initialState = {}

const selectProduct = product => ({
  type: SELECT_PRODUCT,
  product
})

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
