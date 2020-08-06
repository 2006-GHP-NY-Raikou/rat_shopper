const db = require('../db')
const { Sequelize } = require('sequelize')

const Checkout = db.define('checkout', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
})

module.exports = Checkout