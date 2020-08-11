import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToUserCart} from '../store/cart'
import {addToGuestCart} from '../store/guestCart'

export const SingleProductView = props => {
  let product = props.product
  return (
    <div className="singleProduct">
      <h1>{product.name}</h1>
      <h2>${product.price / 100}</h2>
      <img src={product.imageUrl} />
      <div>
        <button type="button" onClick={props.handleSubmit}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.loadSingleProduct(productId)
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit() {
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
  }

  render() {
    const product = this.props.product

    if (!this.props.product) {
      return <div>Aw, rats! This product was not found!</div>
    }

    return (
      <SingleProductView product={product} handleSubmit={this.handleSubmit} />
    )
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
    addToGuestCart: item => dispatch(addToGuestCart(item)),
    addToUserCart: item => dispatch(addToUserCart(item))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
