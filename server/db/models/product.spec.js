const {Product} = require('./index')
const {expect} = require('chai')
const db = require('../db')

//check if enum category is valid
//check if price is a valid price
//check if quantity can below 0 (it shouldn't)

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('`name` is required', async () => {
    const nameless = await Product.create()
    try {
      expect(nameless.validate()).to.throw(Error)
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('`name`,`price`, `quantity` and `category` are required', async () => {
    const newRat = await Product.create({
      name: 'bob',
      price: 2,
      quantity: 1,
      category: 'dumbo'
    })

    expect(newRat.name).to.equal('bob')
    expect(newRat.price).to.equal(2)
    expect(newRat.quantity).to.equal(1)
  })

  it('price is a valid price', async () => {
    const dumboBob = await Product.create({
      name: 'bob',
      category: 'dumbo',
      sex: 'male',
      price: 2,
      quantity: 2,
      imageUrl: null,
      description: 'a cude and cuddly lil monster'
    })
    //// typeof
    // expect('test').to.be.a('string');
    expect(dumboBob.price).to.be.a('number')
    // try {
    //   let result = await Product.validate()
    // } catch (e) {
    //   throw new Error('not a valid price!')
    // }
  })

  it('category is a valid price', async () => {
    const product = await Product.build({
      name: 'bob',
      category: 'dumbo',
      sex: 'male',
      price: 2,
      quantity: 2,
      imageUrl: null,
      description: 'a cude and cuddly lil monster'
    })
    try {
      let result = await product.validate()
    } catch (e) {
      throw new Error('not a valid price!')
    }
  })
})
