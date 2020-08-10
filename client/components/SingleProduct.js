import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

export const SingleProductView = props => {
  let product = props.product
  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <img src={product.imageUrl} />
    </div>
  )
}

export class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.loadSingleProduct(productId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const product = this.props.product

    if (!this.props.product) {
      return <div>Aw, rats! This product was not found!</div>
    }

    return <SingleProductView product={product} />
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
