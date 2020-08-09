import React from 'react'
import {connect} from 'react-redux'
import {updateCart, updateUserCart} from '../store/orderProduct'
import {withRouter} from 'react-router-dom'

class UpdateCartSingleProduct extends React.Component() {
  constructor() {
    super()
    this.state = {
      qty: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      qty: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedProduct = {
      id: this.props.product.id,
      qty: this.state.qty
    }
    if (this.user) {
      updateUserCart(updatedProduct)
    } else {
      updateCart(updatedProduct)
    }
  }

  render() {
    const product = this.props.product
    if (!product.id) {
      return <div>Aw, rats! Not found!</div>
    } else {
      return (
        <div>
          <div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <img src={product.imageUrl} />
          </div>
          <form>
            <div>
              <label htmlFor="qty">Quantity</label>
              <input value={this.state.qty} onChange={this.handleChange} />
              <div>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(UpdateCartSingleProduct))
