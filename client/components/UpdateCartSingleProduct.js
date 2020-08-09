import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   qty :
    // }
  }

  componentDidMount() {
    this.props.loadSingleProduct()
  }

  render() {
    const product = this.props.product

    if (!product.id) {
      return <div>Aw, rats! Not found!</div>
    }

    return (
      <div>
        <div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <img src={product.imageUrl} />
        </div>
        <form>
          <input>Quantity</input>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    loadSingleProduct: () => dispatch(fetchSingleProduct)
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
