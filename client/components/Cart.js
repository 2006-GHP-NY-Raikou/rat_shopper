import React from 'react'
import {
  fetchUserCart,
  clearCart,
  checkout,
  updateCart,
  updateUserCart
} from '../store/cart'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      qty: 0
    }
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    this.handleSubmitCheckout = this.handleSubmitCheckout.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleChangeUpdate(event) {
    this.setState({
      qty: event.target.value
    })
    console.log(this.state.qty, 'qty')
  }

  handleSubmitCheckout(event) {
    event.preventDefault()
    this.props.checkout()
    this.props.clearCart()
  }

  handleSubmitUpdate(event, id, price) {
    event.preventDefault()
    console.log(this.state.qty, 'qty')
    console.log(event, id, price)
    const updatedProduct = {
      id,
      qty: this.state.qty,
      price
    }
    if (this.props.user) {
      this.props.updateUserCart(updatedProduct)
    } else {
      this.props.updateCart(updatedProduct)
    }
  }

  //renders cart items and checkout button.
  //cart items could be a seperate component for convenience
  render() {
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <CartItem
              key={product.id}
              {...product}
              handleChange={this.handleChangeUpdate}
              handleSubmit={this.handleSubmitUpdate}
            />
          ))}
        </div>
        <form>
          <button type="submit" onSubmit={this.handleSubmit}>
            Checkout
          </button>
        </form>
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
  updateUserCart: updated => dispatch(updateUserCart(updated))
})

export default connect(mapState, mapDispatch)(Cart)
