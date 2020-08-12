import React from 'react'
import {
  fetchUserCart,
  clearCart,
  updateCart,
  updateUserCart,
  removeFromUserCart,
  addToUserCart
} from '../store/cart'
import {
  getGuestCart,
  addToGuestCart,
  updateGuestCart,
  removeFromGuestCart
} from '../store/guestCart'
import {guestCheckout, userCheckout} from '../store/checkout'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {toast} from 'react-toastify'
import convertToChange from './ConvertToChange'

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

  //if user refreshes the page on cart component, this ensures that the loggedIn cart state will re-load
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) this.props.fetchCart()
  }

  handleSubmitCheckout(event) {
    event.preventDefault()
    if (this.props.cart.length || this.props.guestCart.length) {
      if (this.props.user.id) this.props.userCheckout()
      else this.props.guestCheckout(this.props.guestCart)
      this.props.clearCart()
      this.props.history.push(`/cart/checkout/confirmation`)
    } else toast.warning("There's nothing in your cart")
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
    let cart = this.props.guestCart.length
      ? this.props.guestCart
      : this.props.cart

    const total = cart.reduce((accum, item) => {
      return item.price * item.qty + accum
    }, 0)

    return (
      <React.Fragment>
        <div id="cartPage">
          <div>
            <div>{this.props.user.firstName || `Guest`}'s cart</div>
            <div id="checkout-container">
              <div className="cart">
                {cart.length > 0
                  ? cart.map(product => (
                      <CartItem
                        key={product.id}
                        {...product}
                        handleSubmit={this.handleSubmitUpdate}
                      />
                    ))
                  : 'is empty (for now)!'}
              </div>
            </div>
          </div>
          <div id="checkout">
            <div className="cart-total">
              Cart Total: ${convertToChange(total)}
            </div>
            <button type="button" onClick={this.handleSubmitCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  guestCart: state.guestCart,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchUserCart()),
  fetchGuestCart: products => dispatch(getGuestCart(products)),
  clearCart: () => dispatch(clearCart()),
  userCheckout: () => dispatch(userCheckout()),
  guestCheckout: products => dispatch(guestCheckout(products)),
  updateCart: updated => dispatch(updateCart(updated)),
  updateUserCart: updated => dispatch(updateUserCart(updated)),
  remove: productId => dispatch(removeFromUserCart(productId)),
  addToGuestCart: product => dispatch(addToGuestCart(product)),
  updateGuestCart: product => dispatch(updateGuestCart(product)),
  removeFromGuestCart: productId => dispatch(removeFromGuestCart(productId)),
  guestToUserCart: product => dispatch(addToUserCart(product)),
  clearGuestCart: () => dispatch(guestCheckout())
})

export default connect(mapState, mapDispatch)(Cart)
