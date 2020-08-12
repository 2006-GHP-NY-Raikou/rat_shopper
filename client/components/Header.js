import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Header = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="header">
      <h1>
        <Link to="/home">Rat Shopper</Link>
      </h1>

      {isLoggedIn ? (
        <div>
          <div className="upperRight">
            {/* The navbar will show these links after you log in */}
            <Link to="/cart" exact="true">
              Cart
            </Link>

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="upperRight">
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link> */}
            <Link to="/cart" exact="true">
              Cart
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
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

export default connect(mapState, mapDispatch)(Header)

/**
 * PROP TYPES
 */
Header.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
