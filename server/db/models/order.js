const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  cart: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  address: {
    type: Sequelize.STRING
  }
})

module.exports = Order

// To do: write the hooks that will convert our objects from redux store
