import React from 'react'
import {fetchOrderProducts} from '../store/orderProduct'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div id="checkout-container">
        <div className="cart">
          {this.props.cart.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <Link to={`/cart/update/${product.id}`} />
              <button type="button">Edit</button>
            </div>
          ))}
        </div>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.orderProducts,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchCart: () => dispatch(fetchOrderProducts())
})

export default connect(mapState, mapDispatch)(Cart)
