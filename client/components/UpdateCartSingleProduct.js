import React from 'react'

class UpdateCartSingleProduct extends React.Component() {
  constructor() {
    super()
    this.state = {
      qty: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      qty: event.target.value
    })
  }

  render() {
    const product = this.props.product
    if (!product.id) {
      return <div>Aw, rats! Not found!</div>
    } else {
      return (
        <div>
          <div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <img src={product.imageUrl} />
          </div>
          <form>
            <div>
              <label htmlFor="qty">Quantity</label>
              <input value={this.state.qty} onChange={this.handleChange} />
              <div>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default UpdateCartSingleProduct
