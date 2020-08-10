import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart, addToUserCart} from '../store/cart'

export const SingleProductView = props => {
  let product = props.product
  return (
    <div>
      <h1>{product.name}</h1>
      <h2>${product.price / 100}</h2>
      <img src={product.imageUrl} />
      <div>
        <button type="button" onClick={props.handleSubmit}>
          Add
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
    if (this.props.user) {
      this.props.addToUserCart(product)
    } else {
      this.props.addToCart(product)
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
    addToCart: item => dispatch(addToCart(item)),
    addToUserCart: item => dispatch(addToUserCart(item))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
