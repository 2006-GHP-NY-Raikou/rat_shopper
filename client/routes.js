import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Home,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  AllUsers,
  SingleUser,
  UpdateProduct,
  NewProduct,
  RemoveProduct,
  PaymentPage,
  ConfirmationPage
} from './components'
import {addToUserCart} from './store/cart'
import {guestCheckout} from './store/guestCart'
import {me} from './store'
import axios from 'axios'

/**
 * COMPONENT
 */

class Routes extends Component {
  constructor() {
    super()
    this.state = {random: null}
  }
  componentDidMount() {
    this.props.loadInitialData()
    const random = async () => {
      const {data} = await axios.get('/api/products/random')
      // const path = `/products/${data}`
      this.setState({random: data})
    }
    random()
  }

  //if user logs in and there are items in their guest cart:
  //guest cart items are added to user cart items
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.isLoggedIn && this.props.guestCart.length) {
        this.props.guestCart.map(product =>
          this.props.guestToUserCart({...product, productId: product.id})
        )
        this.props.clearGuestCart()
      }
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />

        <Route
          path="/random"
          // component={async () => {
          //   const {data} = await axios.get('/api/products/random')
          //   console.dir(data)
          //   console.dir(`/products/${data}`)
          //   // const path = `/products/${data}`
          //   <Redirect to="/products" />
          // }}
        >
          <Redirect to={`/products/${this.state.random}`} />
        </Route>

        <Route path="/users/:userId" component={SingleUser} />
        {/* <Route path="/products" component={singleProduct} /> */}
        <Route path="/cart/update/productId" />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        {/* <Route exact path="/cart/checkout/payment" component={PaymentPage} /> */}
        <Route
          exact
          path="/cart/checkout/confirmation"
          component={ConfirmationPage}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/users" component={AllUsers} />
            <Route path="/users/:userId" component={SingleUser} />
            {/* Even though the following "admin" routes are in isLoggedIn, the components associated with these paths won't render if not admin*/}
            <Route
              exact
              path="/admin/updateProduct/:productId"
              component={UpdateProduct}
            />
            <Route exact path="/admin/NewProduct" component={NewProduct} />
            <Route
              exact
              path="/admin/RemoveProduct"
              component={RemoveProduct}
            />
          </Switch>
        )}

        {}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me()),
    guestToUserCart: product => dispatch(addToUserCart(product)),
    clearGuestCart: () => dispatch(guestCheckout())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
