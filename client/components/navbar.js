import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <nav>
      {/* <h1>
        <Link to="/home">Rat Shopper</Link>
      </h1> */}
      {isLoggedIn ? (
        <div>
          <div className="navBar">
            {/* The navbar will show these links after you log in */}
            <Link to="/products" exact="true">
              All Products
            </Link>
            <Link to="/products" exact="true">
              All Rats
            </Link>
            <Link to="/products" exact="true">
              Rat Accessories
            </Link>
            <Link to="/products/random">Random Rat!</Link>
            <Link to="/users/:userId" exact="true">
              My Profile
            </Link>
            {user.isAdmin ? (
              <Link to="/admin/NewProduct" exact="true">
                Add Product
              </Link>
            ) : (
              ' '
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="navBar">
            <Link to="/products" exact="true">
              All Products
            </Link>
            <Link to="/products" exact="true">
              All Rats
            </Link>
            <Link to="/products" exact="true">
              Rat Accessories
            </Link>
            <Link to="/random">Rat of the Day</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
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
