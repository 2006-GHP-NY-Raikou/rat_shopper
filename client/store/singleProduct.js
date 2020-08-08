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

export const updateProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, {
        name: product.name,
        category: product.category,
        sex: product.sex,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        description: product.description
      })

      dispatch(selectProduct(data))
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
