import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/allProducts'

class NewProduct extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProduct(this.state)
  }

  render() {
    return (
      <div id="newProduct">
        {this.props.user.isAdmin ? (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">New Product Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Required"
            />

            <label htmlFor="price">Price:</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder="Required"
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
            <br />
            <button type="submit">Submit</button>
          </form>
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
  return {addProduct: product => dispatch(addProduct(product))}
}

export default connect(mapState, mapDispatch)(NewProduct)
