'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')
//const session = require('express-session')
const {users, products, orders, orderProducts, sessions} = require('./seedData')

async function seed() {
  try {
    await db.sync({force: true})
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )
    await Promise.all(
      orders.map(order => {
        return Order.create(order)
      })
    )
    await Promise.all(
      orderProducts.map(orderProduct => {
        return OrderProduct.create(orderProduct)
      })
    )
    // await Promise.all(sessions.map(session => { return Session.create(session) }));

    console.log('db synced!')
    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${products.length} products`)
    console.log(`seeded ${orders.length} orders`)
    console.log(`seeded ${orderProducts.length} order/Poducts`)
    //console.log(`seeded ${sessions.length} sessions`)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
