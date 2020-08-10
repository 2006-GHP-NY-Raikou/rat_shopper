import React from 'react'
import {
  fetchUserCart,
  getCart,
  clearCart,
  checkout,
  updateCart,
  updateUserCart,
  removeFromUserCart,
  addToGuestCart,
  updateGuestCart,
  removeFromGuestCart
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
    if (this.props.user.id) this.props.fetchCart()
    else {
      const savedCart = JSON.parse(window.localStorage.getItem('cart'))
      this.props.fetchGuestCart(savedCart || [])
    }
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
        if (this.props.user.id) {
          this.props.remove(id)
        } else {
          this.props.removeFromGuestCart(id)
        }
      } else {
        const updatedProduct = {
          productId: id,
          qty: +event.target.value,
          price
        }
        if (this.props.user.id) {
          this.props.updateUserCart(updatedProduct)
        } else {
          this.props.updateGuestCart(updatedProduct)
        }
      }
    }
  }

  //renders cart items and checkout button.
  //cart items could be a seperate component for convenience
  render() {
    const total = this.props.cart.reduce((accum, item) => {
      return item.price / 100 * item.qty + accum
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
  fetchGuestCart: products => dispatch(getCart(products)),
  clearCart: () => dispatch(clearCart()),
  checkout: () => dispatch(checkout()),
  updateCart: updated => dispatch(updateCart(updated)),
  updateUserCart: updated => dispatch(updateUserCart(updated)),
  remove: productId => dispatch(removeFromUserCart(productId)),
  addToGuestCart: product => dispatch(addToGuestCart(product)),
  updateGuestCart: product => dispatch(updateGuestCart(product)),
  removeFromGuestCart: productId => dispatch(removeFromGuestCart(productId))
})

export default connect(mapState, mapDispatch)(Cart)
