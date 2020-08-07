import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {sort: 'random', filter: 'all'}
    this.handleChange = this.handleChange.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }
  componentDidMount() {}
  handleChange(event) {
    this.setState({sort: event.target.value})
  }
  handleFilter(event) {
    this.setState({filter: event.target.value})
  }
  render() {
    const {products} = this.props
    let filteredProducts = products

    //Logic for filtering and sorting below, ie:

    // if (this.state.filter === "noStudents") {
    //   filteredCampuses = campuses.filter((c) => {
    //     return c.students.length === 0;
    //   });
    // }

    // if (this.state.sort === "enrolled") {
    //   console.log(filteredCampuses);

    //   filteredCampuses.sort((a, b) => {
    //     return a.students.length < b.students.length ? 1 : -1;
    //   });
    // }

    return (
      <div>
        <div>
          <div>
            Sort:{' '}
            <select value={this.state.sort} onChange={this.handleChange}>
              <option value="random">Random order</option>
              <option value="highLow">Price (high-low)</option>
              <option value="lowHigh">Price (low-high)</option>
            </select>
          </div>

          <div>
            Filter:{' '}
            <select value={this.state.filter} onChange={this.handleFilter}>
              <option value="all">All products</option>
              <option value="rats">Rats for adoption</option>
              <option value="accessories">Rat accessories</option>
            </select>
          </div>
        </div>
        <div>
          {filteredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div>{product.name}</div>

              <img src={product.imageUrl} />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    // loadProducts:
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
