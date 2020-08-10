import React from 'react'
import {Link} from 'react-router-dom'

const ProductView = props => {
  const product = props.product
  return (
    <Link to={`/products/${product.id}`} key={product.id}>
      <div>{product.name}</div>
      <img src={product.imageUrl} />
      <div>Price: ${product.price / 100}</div>
      <p />
    </Link>
  )
}

export default ProductView
