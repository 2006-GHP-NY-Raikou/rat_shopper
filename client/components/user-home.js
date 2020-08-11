import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div id="userHome">
      <h2>Welcome, {email}</h2>
      <img src="https://p0.pxfuel.com/preview/610/407/738/rat-color-rats-rodent-fur.jpg" />
      <h3>We're so happy to see you again!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
