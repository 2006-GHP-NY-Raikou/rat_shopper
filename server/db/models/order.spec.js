const {expect, assert} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))
})

/*
status true means order has been checked out ie is not active anymore
there should only be on order per user with status false (current ‘cart’)
*/
