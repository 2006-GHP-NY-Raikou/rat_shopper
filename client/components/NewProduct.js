import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/allProducts'

class NewProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      category: '',
      sex: '',
      price: '',
      quantity: '',
      imageUrl: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.add(this.state)
    this.setState({
      name: '',
      category: '',
      sex: '',
      price: '',
      quantity: '',
      imageUrl: '',
      description: ''
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">New Product Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <label htmlFor="sex">Sex:</label>
        <input
          type="text"
          name="sex"
          value={this.state.sex}
          onChange={this.handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <label htmlFor="imageUrl">ImageUrl:</label>
        <input
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description:</label>
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
  return {addProduct: product => dispatch(addProduct(product))}
}

export default connect(null, mapDispatch)(NewProduct)
