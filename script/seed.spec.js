'use strict'
/* global describe it */

const {expect} = require('chai')
const seed = require('./seed')
const {Product, User} = require('../server/db/models')

describe('seed script', () => {
  it('completes successfully', seed)

  it('populates the database with at least 10 products and 3 users', async () => {
    const seededProducts = await Product.findAll()
    const seededUsers = await User.findAll()
    expect(seededProducts).to.have.lengthOf.at.least(10)
    expect(seededUsers).to.have.lengthOf.at.least(3)
  })
})
