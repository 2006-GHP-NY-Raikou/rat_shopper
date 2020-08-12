import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart, addToUserCart} from '../store/cart'

import RemoveProduct from './RemoveProduct'
import {addToGuestCart} from '../store/guestCart'
import {UpdateProduct} from './index'

//THIS SHOULD WORK!
import convertToChange from './ConvertToChange.js'
import history from '../history'

export const SingleProductView = props => {
  let product = props.product
  return (
    <div className="singleProduct">
      <img src={product.imageUrl} />
      <h1>Name: {product.name}</h1>
      {/* Something to note: On form, either the admin has to know that we are storing in pennies, or we update form to reflect this.  */}
      <h2>Price: ${convertToChange(product.price)}</h2>
      {product.sex ? <h2>Sex: {product.sex} </h2> : <div />}
      <h2>Description: {product.description}</h2>
      {props.user.isAdmin ? (
        <div>
          {product.quantity ? (
            <div>
              <h2>Category: {product.category}</h2>
              <h2> Quantity in stock: {product.quantity}</h2>
              <button type="button" onClick={props.handleSubmitAddToCart}>
                Add to Cart
              </button>
            </div>
          ) : (
            <h2>Out of Stock</h2>
          )}
          <div>
            <button type="button" onClick={() => props.handleUpdate(true)}>
              Update
            </button>
            <div>
              <RemoveProduct product={product.id} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {product.quantity ? (
              <div>
                <button type="button" onClick={props.handleSubmitAddToCart}>
                  Add to Cart
                </button>
              </div>
            ) : (
              <h3>Out of Stock</h3>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {isOpen: false}
    this.handleSubmitAddToCart = this.handleSubmitAddToCart.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.loadSingleProduct(productId)
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmitAddToCart() {
    const product = {
      productId: this.props.match.params.productId,
      qty: 1,
      price: this.props.product.price
    }
    if (this.props.user.id) {
      this.props.addToUserCart(product)
    } else {
      this.props.addToGuestCart({
        ...this.props.product,
        qty: 1,
        price: product.price
      })
    }
    history.push('/products')
  }

  handleUpdate(val) {
    this.setState({isOpen: val})
  }

  render() {
    const product = this.props.product
    // const Update = this.state.isOpen ? <UpdateProduct /> : null

    if (!this.props.product) {
      return <div>Aw, rats! This product was not found!</div>
    } else {
      return (
        <>
          <SingleProductView
            user={this.props.user}
            product={product}
            handleSubmitAddToCart={this.handleSubmitAddToCart}
            handleUpdate={this.handleUpdate}
          />
          {this.state.isOpen ? (
            <UpdateProduct product={product} handleUpdate={this.handleUpdate} />
          ) : null}
        </>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: item => dispatch(addToCart(item)),
    addToGuestCart: item => dispatch(addToGuestCart(item)),
    addToUserCart: item => dispatch(addToUserCart(item))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
