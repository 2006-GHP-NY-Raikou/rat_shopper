import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSingleUserThunk, clearSingleUser} from '../store/singleUser'

/**
 * COMPONENT
 */

//Single user page: for viewing a single user that is not yourself
//for admin and possibly other users

export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.id)
  }

  render() {
    const {
      email,
      firstName,
      lastName,
      address,
      zipCode,
      country
    } = this.props.singleUser
    return (
      <div id="single-user-container">
        <h3>Welcome, {`${firstName} ${lastName}`}</h3>
        <div id="user-info">
          <h5>email: {email}</h5>
          <p>{`
            Shipping address:\n
            ${firstName} ${lastName}\n
            ${address}\n
            ${country}, ${zipCode}\n
            `}</p>
          <div id="past-orders">coming soon!</div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  singleUser: state.singleUser
})

const mapDispatch = dispatch => ({
  fetchSingleUser: id => dispatch(getSingleUserThunk(id)),
  clearUser: () => dispatch(clearSingleUser())
})

export default connect(mapState, mapDispatch)(SingleUser)

/**
 * PROP TYPES
 */
SingleUser.propTypes = {
  email: PropTypes.string
}
