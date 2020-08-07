const db = require('../db')
const {Sequelize} = require('sequelize')

const OrderProduct = db.define('orderProduct', {
  qty: {
    type: Sequelize.INTEGER
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
