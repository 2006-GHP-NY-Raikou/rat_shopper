import React from 'react'
import {fetchUserCart, clearCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.clearCart()
  }

  render() {
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <Link
                to={{
                  pathname: `/cart/update/${product.id}`,
                  state: {
                    id: product.id,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    qty: product.qty
                  }
                }}
              >
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
  clearCart: () => dispatch(clearCart())
})

export default connect(mapState, mapDispatch)(Cart)
