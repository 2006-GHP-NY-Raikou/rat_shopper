const {expect} = require('chai')
const db = require('../index')
const Stock = db.model('stock')

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
    } catch (e) {
      throw new Error('not a valid price!')
    }
  })
})
