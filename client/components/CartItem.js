import React from 'react'

//represents one cart item
const CartItem = props => {
  //this can go to some other utils component so that it can be re-used
  const convertToChange = (price, qty) => {
    let toChange = price * qty / 100
    if ((price * qty) % 100 === 0) return toChange + '.00'
    else if (!toChange.toString().endsWith('0')) return toChange + '0'
  }

  return (
    <div className="cart-item-container">
      <div className="cart-item-info-container">
        <img className="cart-item-img" src={props.imageUrl} />
        <div className="cart-item-info">
          <h2>{props.name}</h2>
          <p>${convertToChange(props.price, props.qty)}</p>
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
