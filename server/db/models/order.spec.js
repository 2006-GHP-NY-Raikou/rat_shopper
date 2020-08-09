const {expect, assert} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  /*
  status true means order has been checked out ie is not active anymore
  there should only be on order per user with status false (current ‘cart’)
  */
  it('checks that there is at most 1 Order per User that has a status of false (aka open order)', async () => {}) // closes it
}) // closes describe Order model
