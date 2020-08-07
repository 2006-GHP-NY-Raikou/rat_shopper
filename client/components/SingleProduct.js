import React from 'react'
import {connect} from 'react-redux'

class SingleProduct extends React.Component {
  componentDidMount() {}

  render() {
    const product = this.props.product
    let campus

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
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    // loadSingleProduct:
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
