import React from 'react'
import {Link} from 'react-router-dom'

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
        <div>Price: ${product.price / 100}</div>
        <p />
      </div>
      <div>
        <div>{product.quantity ? <div /> : <h3>Out of Stock</h3>}</div>
      </div>
    </div>
  )
}

export default ProductView
