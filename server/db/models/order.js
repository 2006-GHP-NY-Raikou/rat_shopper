const db = require('../db')
const Sequelize = require('sequelize')
const OrderProduct = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
