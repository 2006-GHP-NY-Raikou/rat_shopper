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

  describe('column definitions', () => {
    it('has a `name`, `category`, `sex`, `price`, `quantity`, `imageUrl` and `description`', async () => {
      const product = await Product.create({
        name: 'Ron',
        category: 'rex',
        sex: 'male',
        price: 6000,
        quantity: 1,
        imageUrl:
          'https://pm1.narvii.com/5814/f93414bcd343cc962d2cb21ed032617c98c77ba7_hq.jpg',
        description: 'Ginger rat!'
      }) // closes Product. create
      expect(product.name).to.equal('Ron')
      expect(product.category).to.equal('rex')
      expect(product.sex).to.equal('male')
      expect(product.price).to.equal(6000)
      expect(product.quantity).to.equal(1)
      expect(product.imageUrl).to.be.a('string')
      expect(product.description).to.be.a('string')
    }) //closes it
  }) // closes describe

  describe('column validations', () => {
    it('`name` and `price` are required', async () => {
      try {
        const nameless = await Product.create({})
        throw Error('validate did not throw a validation error')
      } catch (err) {
        expect(err.message).to.contain('product.name cannot be null')
        expect(err.message).to.contain('product.price cannot be null')
      }
    })

    it('`name` cannot be empty', async () => {
      try {
        const emptyName = await Product.create({name: ''})
        throw Error(
          'validation should have failed with empty name and category'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name failed')
      }
    })

    it('`price` cannot be 0', async () => {
      try {
        const freeProduct = await Product.create({price: 0})
        throw Error('validation should have failed with a price of 0')
      } catch (err) {
        expect(err.message).to.contain('Validation min on price failed')
      }
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
      expect(dumboBob.price).to.be.a('number')
    })

    it('category has values corresponding to one of the preset categories', async () => {
      try {
        const fakeCategory = await Product.create({
          name: 'bob',
          price: 2,
          category: 'wrongCat'
        })
        throw Error(
          'validation should have failed with a category not within our ENUM types'
        )
      } catch (err) {
        expect(err.message).to.contain(
          'Validation error: category should be one of the pre-set categories'
        )
      }
    })

    it('sex has values corresponding to one of the preset categories', async () => {
      try {
        const fakeSex = await Product.create({
          name: 'bob',
          price: 2,
          sex: 'me'
        })
        throw Error(
          'validation should have failed with a sex not within our ENUM types'
        )
      } catch (err) {
        expect(err.message).to.contain(
          'Validation error: sex has to be either male, female, or null'
        )
      }
    })
  })
})
