import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import guestCart from './guestCart'
import products from './allProducts'
import product from './singleProduct'
import singleUser from './singleUser'
import users from './allUsers'
import orderConfirmationNumber from './checkout'

const reducer = combineReducers({
  user,
  products,
  product,
  cart,
  guestCart,
  singleUser,
  users,
  orderConfirmationNumber
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
