/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => db.sync({force: true}))
  describe('column definitions', () => {
    it('has a `firstName`, `lastName`, `email`, `password`, `address`, `zipCode`, `country`, `isAdmin`', async () => {
      const user = await User.create({
        firstName: 'Al',
        lastName: 'Rat',
        email: 'imARatShopper@gmail.com',
        password: 'password123!',
        address: '5 Hanover Square',
        zipCode: 10004,
        country: 'USA',
        isAdmin: false
      })
      expect(user.firstName).to.equal('Al')
      expect(user.lastName).to.equal('Rat')
      expect(user.email).to.equal('imARatShopper@gmail.com')
      expect(typeof user.password()).to.equal('string')
      expect(user.address).to.equal('5 Hanover Square')
      expect(user.zipCode).to.equal(10004)
      expect(user.country).to.equal('USA')
      expect(user.isAdmin).to.equal(false)
    })
  }) // closes column definitions describe
  describe('column validations', () => {
    it('`email` is required', async () => {
      try {
        const user = await User.create({})
        throw new Error('Validation should have failed!')
      } catch (err) {
        expect(err.message).to.contain('email cannot be null')
      }
    })

    it('email must be a valid email', async () => {
      try {
        const invalidEmail = await User.create({email: 'myemail'})
        throw Error('validate did not throw validation error')
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on email failed')
      }
    })

    it('email must be unique', async () => {
      try {
        const emailAddress = await User.create({email: 'myemail@gmail.com'})
        const nonUniqueEmail = await User.create({email: 'myemail@gmail.com'})
        throw Error('no SequelizeUniqueConstraintError thrown')
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })

    //SequelizeUniqueConstraintError
  }) // closes column validaitions describe
}) // closes User model describe

// describe('instanceMethods', () => {
//   describe('correctPassword', () => {
//     let cody

//     beforeEach(async () => {
//       cody = await User.create({
//         email: 'cody@puppybook.com',
//         password: 'bones'
//       })
//     })

//     it('returns true if the password is correct', () => {
//       expect(cody.correctPassword('bones')).to.be.equal(true)
//     })

//     it('returns false if the password is incorrect', () => {
//       expect(cody.correctPassword('bonez')).to.be.equal(false)
//     })
//   })
// })
