import React from 'react'
import {connect} from 'react-redux'

import {fetchProducts} from '../store'
import ProductView from './ProductView'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {sort: 'random', filter: 'all'}
    this.handleChange = this.handleChange.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }
  componentDidMount() {
    this.product.loadProducts()
  }
  handleChange(event) {
    this.setState({sort: event.target.value})
  }
  handleFilter(event) {
    this.setState({filter: event.target.value})
  }
  render() {
    const {products} = this.props.products
    let filteredProducts = products

    //Logic for filtering and sorting below

    if (this.state.filter === 'rats') {
      filteredProducts = products.filter(p => {
        return p.sex
      })
    }

    if (this.state.filter === 'accessories') {
      filteredProducts = products.filter(p => {
        return !p.sex
      })
    }

    if (this.state.sort === 'highLow') {
      filteredProducts.sort((a, b) => {
        return a.price < b.price ? 1 : -1
      })
    }

    if (this.state.sort === 'lowHigh') {
      filteredProducts.sort((a, b) => {
        return a.price > b.price ? 1 : -1
      })
    }

    return (
      <div>
        <div>
          <div>
            Sort:{' '}
            <select value={this.state.sort} onChange={this.handleChange}>
              <option value="random">Any order</option>
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
          {filteredProducts
            ? filteredProducts.map(product => {
                return <ProductView product={product} key={product.id} />
                // <Link to={`/products/${product.id}`} key={product.id}>
                //   <div>{product.name}</div>

                //   <img src={product.imageUrl} />
                // </Link>
              })
            : ''}
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
    loadProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
