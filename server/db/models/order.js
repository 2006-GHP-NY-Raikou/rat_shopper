const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
