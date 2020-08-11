import React from 'react'

//represents one cart item
const CartItem = props => {
  return (
    <div className="cart-item-container">
      <img className="cart-item-img" src={props.imageUrl} />
      <div className="cart-item-info-container">
        <div className="cart-item-info">
          <h2>{props.name}</h2>
          <p>${props.qty * props.price / 100}</p>
          <span>Qty: {props.qty}</span>
        </div>

        <form className="cart-edit-qty">
          <label>Edit</label>
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
      </div>
    </div> //cart-item-info
  )
}

export default CartItem
