import React from 'react'

//represents one cart item
const CartItem = props => {
  return (
    <div key={props.id}>
      <div className="cartItem-info">
        <h2>{props.name}</h2>
        <p>${props.orderProduct.priceAtPurchase / 100}</p>
        <div className="cart-qty">
          <span>Qty: {props.orderProduct.qty}</span>
          <form>
            <div>
              <label htmlFor="qty">Quantity</label>
              <input value={props.qty} onChange={props.handleChange} />
              <div>
                <button
                  onSubmit={(
                    event,
                    productId = props.id,
                    price = props.price
                  ) => props.handleSubmit(event, productId, price)}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartItem
