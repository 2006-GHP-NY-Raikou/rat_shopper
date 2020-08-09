import axios from 'axios'

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
      const {data} = await axios.post('/api/products', {
        name: product.name,
        category: product.category,
        sex: product.sex,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        description: product.description
      })
      dispatch(newProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      await axios.destroy(`/api/products/${product.id}`)
      dispatch(removeProduct(product))
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
