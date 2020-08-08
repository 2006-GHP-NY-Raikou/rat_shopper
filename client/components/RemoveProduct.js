import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct} from '../store/allProducts'

class RemoveProduct extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
  }
  async handleRemove(event) {
    event.preventDefault()
    await this.props.remove(this.props.product)
  }
  render() {
    return (
      <button type="button" onClick={e => this.handleRemove(e)}>
        X
      </button>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    remove: product => {
      dispatch(deleteProduct(product))
    }
  }
}

export default connect(null, mapDispatch)(RemoveProduct)
