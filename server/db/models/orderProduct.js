const db = require('../db')
const {Sequelize} = require('sequelize')

const OrderProduct = db.define('checkout', {
  qty: {
    type: Sequelize.INTEGER
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
