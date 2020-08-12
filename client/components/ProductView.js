import React from 'react'
import {Link} from 'react-router-dom'
import convertToChange from './ConvertToChange.js'

const ProductView = props => {
  const product = props.product
  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        key={product.id}
        className="productView"
      >
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
      </Link>
      <div>
        <div>Price: ${convertToChange(product.price, 1)}</div>
        <p />
      </div>
      <div>
        <div>{product.quantity ? <div /> : <h3>Out of Stock</h3>}</div>
      </div>
    </div>
  )
}

export default ProductView
