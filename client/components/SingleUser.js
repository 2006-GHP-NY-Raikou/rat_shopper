import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchOrderProducts } from '../store/orderProduct'

/**
 * COMPONENT
 */

export class SingleUser extends React.Component {

  componentDidMount() {
    this.props.fetchCart(this.props.orderId)
  }

  render() {
  const {email, firstName, lastName, address, zipCode, country} = this.props.user
    return (
      <div id='single-user-container'>
        <h3>Welcome, {`${firstName} ${lastName}`}</h3>
        <div id='user-info'>
          <h5>email: {email}</h5>
          <p>{`
            Shipping address:\n
            ${firstName} ${lastName}\n
            ${address}\n
            ${country}, ${zipCode}\n
            `
          }</p>
          <div id='past-orders'>
            coming soon!
          </div>
        </div>
        <div className='cart'>
          {
            this.props.cart.map(product => product.name)
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user,
  orderId: state.orderId,
  cart: state.orderProducts
})

const mapDispatch = dispatch => ({
  //need a funtion that retrieves unbought items from current order
  fetchCart: orderId => dispatch(fetchOrderProducts(orderId))
})

export default connect(mapState, mapDispatch)(SingleUser)

/**
 * PROP TYPES
 */
SingleUser.propTypes = {
  email: PropTypes.string
}
