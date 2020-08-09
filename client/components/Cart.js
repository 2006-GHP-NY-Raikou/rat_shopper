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

  render() {
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <Link to={`/cart/update/${product.id}`}>
                <button type="button">Edit</button>
              </Link>
            </div>
          ))}
        </div>
        <button type="submit">Checkout</button>
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
