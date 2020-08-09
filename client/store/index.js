import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import orderId from './order'
import cart from './cart'
import products from './allProducts'
import product from './singleProduct'
import singleUser from './singleUser'
import users from './allUsers'

const reducer = combineReducers({
  user,
  products,
  product,
  orderId,
  cart,
  singleUser,
  users
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
