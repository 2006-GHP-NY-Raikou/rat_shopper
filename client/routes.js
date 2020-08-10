import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
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
  NewProduct
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
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
        <Route path="/users/:userId" component={SingleUser} />
        {/* <Route path="/products" component={singleProduct} /> */}
        <Route path="/cart/update/productId" />
        <Route path="/products/:productId" component={SingleProduct} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/users" component={AllUsers} />
            <Route path="/users/:userId" component={SingleUser} />
            <Route
              exact
              path="/admin/updateProduct/:productId"
              component={UpdateProduct}
            />
          </Switch>
        )}

        {/* For admins only: */}
        <Route exact path="/admin/NewProduct" component={NewProduct} />

        {/* <Route exact path="/admin/RemoveProduct" component={RemoveProduct}/> */}

        {/* Displays our Login component as a fallback */}
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
    isLoggedIn: !!state.user.id
    // isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
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
  isLoggedIn: PropTypes.bool.isRequired
}
