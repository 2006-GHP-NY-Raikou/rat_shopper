import axios from 'axios'
import history from '../history'

const SET_PRODUCTS = 'GET_PRODUCTS'
const NEW_PRODUCT = 'NEW_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const initialState = []

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const newProduct = product => ({
  type: NEW_PRODUCT,
  product
})
const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product
})

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(newProduct(data))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      const deletedProduct = await axios.delete(`/api/products/${product}`)
      dispatch(removeProduct(deletedProduct))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}

export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products

    case NEW_PRODUCT:
      return [...state, action.product]

    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)

    default:
      return state
  }
}
