const {expect, assert} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has fields cart, address)', async () => {
    const order = await Order.create({
      cart: [],
      address: ''
    })
    expect(order.cart).to.deep.equal([])
    expect(order.address).to.equal('')
  })

  it('cart is an array', async () => {
    const order = await Order.create({
      cart: ['cart'],
      address: ''
    })
    assert(order.cart).is.an('array')
  })
})