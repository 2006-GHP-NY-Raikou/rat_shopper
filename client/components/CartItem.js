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
              <label htmlFor="qty">Quantity</label>
              <input onChange={props.handleChange} />
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
