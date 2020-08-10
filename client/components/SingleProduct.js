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
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    const product = this.props.product

    if (!product.id) {
      return <div>Aw, rats! Not found!</div>
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
