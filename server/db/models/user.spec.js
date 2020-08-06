/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))
  describe('column definitions and validations', () => {
    it('has a `firstName`, `lastName`, `email`, `password`, `address`, `zipCode`, `country`, `isAdmin`', async () => {
      const user = await User.build({
        firstName: 'Al',
        lastName: 'Rat',
        email: 'imARatShopper@gmail.com',
        password: 'password123!',
        address: '5 Hanover Square',
        zipCode: 10004,
        country: 'USA',
        isAdmin: false
      })
      await user.save()
      expect(user.firstName).to.equal('Al')
      expect(user.lastName).to.equal('Rat')
      expect(user.email).to.equal('imARatShopper@gmail.com')
      expect(typeof user.password()).to.equal('string')
      expect(user.address).to.equal('5 Hanover Square')
      expect(user.zipCode).to.equal(10004)
      expect(user.country).to.equal('USA')
      expect(user.isAdmin).to.equal(false)
    })

    it('`email` is required', async () => {
      const user = User.build()
      try {
        await user.validate()
        throw new Error('Validation should have failed!')
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })
})

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })
//   afterEach(() => db.sync({force: true}))

//   //checks whether the email and password exist
//   it('has fields email, password', async () => {
//     const user = await User.create({
//       email: 'test@email.com'
//       //password: 'abc',
//     })
//     expect(user.email).to.equal('test@email.com')
//     //expect(user.password).to.equal('abc')
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody

//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// })  end describe('User model')
