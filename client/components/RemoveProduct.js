import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct} from '../store/allProducts'

class RemoveProduct extends React.Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
  }
  async handleRemove(event) {
    event.preventDefault()
    await this.props.remove(this.props.product)
  }
  render() {
    return (
      <div>
        {this.props.user.isAdmin ? (
          <button type="button" onClick={e => this.handleRemove(e)}>
            Delete
          </button>
        ) : (
          <h1>Rats not right, you're not part of the pack!</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    remove: product => {
      dispatch(deleteProduct(product))
    }
  }
}

export default connect(mapState, mapDispatch)(RemoveProduct)
