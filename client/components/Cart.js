import React from 'react'
import {
  fetchUserCart,
  clearCart,
  checkout,
  updateCart,
  updateUserCart,
  removeFromUserCart
} from '../store/cart'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    this.handleSubmitCheckout = this.handleSubmitCheckout.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleSubmitCheckout(event) {
    event.preventDefault()
    this.props.checkout()
    this.props.clearCart()
  }

  handleSubmitUpdate(event, id, price) {
    event.preventDefault()
    if (event.target.value !== 'select qty') {
      if (+event.target.value === 0) {
        this.props.remove(id)
      } else {
        const updatedProduct = {
          productId: id,
          qty: +event.target.value,
          price
        }
        if (this.props.user) {
          this.props.updateUserCart(updatedProduct)
        } else {
          this.props.updateCart(updatedProduct)
        }
      }
    }
  }

  //renders cart items and checkout button.
  //cart items could be a seperate component for convenience
  render() {
    const total = this.props.cart.reduce((accum, item) => {
      return item.priceAtPurchase / 100 * item.qty + accum
    }, 0)
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <CartItem
              key={product.id}
              {...product}
              handleSubmit={this.handleSubmitUpdate}
            />
          ))}
        </div>
        <div className="cart-total">
          <div> Cart Total: ${total}</div>
        </div>
        <div>
          <button type="button" onClick={this.handleSubmitCheckout}>
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchUserCart()),
  clearCart: () => dispatch(clearCart()),
  checkout: () => dispatch(checkout()),
  updateCart: updated => dispatch(updateCart(updated)),
  updateUserCart: updated => dispatch(updateUserCart(updated)),
  remove: productId => dispatch(removeFromUserCart(productId))
})

export default connect(mapState, mapDispatch)(Cart)
