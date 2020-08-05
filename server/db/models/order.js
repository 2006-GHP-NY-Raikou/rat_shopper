const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  stockId: {
    type: Sequelize.INTEGER
  },
  qty: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
