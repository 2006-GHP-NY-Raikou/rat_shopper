import React from 'react'

//represents one cart item
const CartItem = props => {
  return (
    <div key={props.id}>
      <div className="cartItem-info">
        <h2>{props.name}</h2>
        <p>${props.priceAtPurchase / 100}</p>
        <div className="cart-qty">
          <span>Qty: {props.qty}</span>
          <form
            onSubmit={(event, productId = props.id, price = props.price) =>
              props.handleSubmit(event, productId, price)
            }
          >
            <div>
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
              <div>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartItem
