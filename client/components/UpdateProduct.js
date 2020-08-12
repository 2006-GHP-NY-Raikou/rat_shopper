import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.update(this.props.product.id, this.state)
    this.props.handleUpdate(false)
  }

  render() {
    return (
      <div id="updateModal">
        {this.props.user.isAdmin ? (
          <div id="updateModalContent">
            <span
              id="closeModal"
              onClick={() => this.props.handleUpdate(false)}
            >
              &times;
            </span>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Updated Name:</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <label htmlFor="category">Updated Category:</label>
              <input
                type="text"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
              <label htmlFor="sex">Updated Sex:</label>
              <input
                type="text"
                name="sex"
                value={this.state.sex}
                onChange={this.handleChange}
              />
              <label htmlFor="price">Updated Price:</label>
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <label htmlFor="quantity">Updated Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <label htmlFor="imageUrl">Updated ImageUrl:</label>
              <input
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
              <label htmlFor="description">Updated Description:</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <h1> Rats not right, you're not in the pack!</h1>
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
    update: (product, updatedProduct) =>
      dispatch(updateProduct(product, updatedProduct))
  }
}

export default connect(mapState, mapDispatch)(UpdateProduct)
