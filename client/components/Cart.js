import React from 'react'
import {fetchUserCart, clearCart, checkout} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkout()
    this.props.clearCart()
  }

  //renders cart items and checkout button.
  //cart items could be a seperate component for convenience
  render() {
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <div key={product.id}>
              <div className="cartItem-info">
                <h2>{product.name}</h2>
                <p>${product.orderProduct.priceAtPurchase / 100}</p>
                <div className="cart-qty">
                  <span>Qty: {product.orderProduct.qty}</span>
                  <Link to={`/cart/update/${product.id}`}>
                    <button type="button">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
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
  cart: state.cart
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchUserCart()),
  clearCart: () => dispatch(clearCart()),
  checkout: () => dispatch(checkout())
})

export default connect(mapState, mapDispatch)(Cart)
