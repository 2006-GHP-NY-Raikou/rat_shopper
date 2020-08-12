import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSingleUserThunk, clearSingleUser} from '../store/singleUser'
import convertToChange from './ConvertToChange'

/**
 * COMPONENT
 */

//Single user page: for viewing a single user that is not yourself
//for admin and possibly other users

export class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId)
  }

  render() {
    const {
      email,
      firstName,
      lastName,
      address,
      zipCode,
      country,
      pastPurchases
    } = this.props.singleUser
    return (
      <div id="single-user-container">
        <div id="user-info">
          <h5>email: {email}</h5>
          <p>{`
            Shipping address:\n
            ${firstName} ${lastName}\n
            ${address}\n
            ${country}, ${zipCode}\n
            `}</p>
          <div id="past-orders">
            <h3>Past Purchases:</h3>
            {pastPurchases
              ? pastPurchases.map(product => (
                  <div className="cart-item-container" key="item.id">
                    <div className="cart-item-info-container">
                      <img className="cart-item-img" src={product.imageUrl} />
                      <div className="cart-item-info">
                        <h2>{product.name}</h2>
                        <p>
                          ${convertToChange(
                            product.orderProduct.priceAtPurchase,
                            product.orderProduct.qty
                          )}
                        </p>
                        <small>Qty: {product.orderProduct.qty}</small>
                      </div>
                    </div>
                  </div>
                ))
              : ''}
          </div>
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
