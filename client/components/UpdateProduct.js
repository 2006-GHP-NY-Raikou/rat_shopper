import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      category: '',
      sex: '',
      price: '',
      qty: '',
      imageUrl: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.update(this.props.match.params.productID, this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Updated Product Name:</label>
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
          name="qty"
          value={this.state.qty}
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
    )
  }
}

const mapDispatch = dispatch => {
  return {update: product => dispatch(updateProduct(product))}
}

export default connect(null, mapDispatch)(UpdateProduct)
