import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ConfirmationPage = props => {
  return (
    <div>
      <h3>Thank you for your order!</h3>
      <p>
        {props.orderId
          ? `Your order confirmation number is:  ${props.orderId}
      You will recieve a confirmation email shortly\n
      Or, you WOULD... if this was a real e-commerce website :')`
          : `no recent orders. Adopt your rat today!`}
      </p>
      {!props.loggedIn && (
        <p>
          want the full rat shopper experience?{' '}
          <Link to="/signup">Sign up</Link> today!
        </p>
      )}
    </div>
  )
}

const mapState = state => ({
  orderId: state.orderConfirmationNumber,
  loggedIn: !!state.user
})

export default connect(mapState)(ConfirmationPage)
