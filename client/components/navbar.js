import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {/* <h1>
        <Link to="/home">Rat Shopper</Link>
      </h1> */}
      {isLoggedIn ? (
        <div>
          <div className="navBar">
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home">Home</Link> */}
            <Link to="/products" exact="true">
              All Products
            </Link>
            {/* <Link to="/cart" exact="true">
              Cart
            </Link> */}
            {/* <Link to="/users/:userId" exact="true">My Profile</Link> */}

            {/* <a href="#" onClick={handleClick}>
              Logout
            </a> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="navBar">
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link> */}
            <Link to="/products" exact="true">
              All Products
            </Link>
            <Link to="cart">Cart</Link>
          </div>
        </div>
      )}

      {/* <div className="header">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div> */}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
