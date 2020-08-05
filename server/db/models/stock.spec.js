const { Stock } = require('./stock')
const { expect } = require('chai')
const { db } = require('../db')

//check if enum category is valid
//check if price is a valid price
//check if quantity can below 0 (it shouldn't)

describe('Stock model', () => {
  it('price is a valid price', async () => {
    const stock = await Stock.build({
      name: 'bob',
      category: 'dumbo',
      sex: male,
      price: 2,
      quantity: 2,
      imageUrl: null,
      description: 'a cude and cuddly lil monster'
    })
    try {
      let result = await stock.validate()
    } catch (e) { throw new Error('not a valid price!') }
  })
})
