import React from 'react'
import convertToChange from './ConvertToChange.js'

//represents one cart item
const CartItem = props => {
  return (
    <div className="cart-item-container">
      <div className="cart-item-info-container">
        <img className="cart-item-img" src={props.imageUrl} />
        <div className="cart-item-info">
          <h3>{props.name}</h3>
          <p>${convertToChange(props.price * props.qty)}</p>
          <small>Qty: {props.qty}</small>
        </div>
      </div>
      <form className="cart-edit-qty">
        <label>
          <small>Edit:</small>
        </label>
        <select
          onChange={(event, productId = props.id, price = props.price) =>
            props.handleSubmit(event, productId, price)
          }
        >
          <option defaultValue>select qty</option>
          <option value={0}>0 (delete)</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </form>
    </div> //cart-item-info
  )
}

export default CartItem
