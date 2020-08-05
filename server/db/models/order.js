const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Order

// To do: write the hooks that will convert our objects from redux store
