const db = require('../db')
const {Sequelize} = require('sequelize')

const orderProduct = db.define('checkout', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
})

module.exports = orderProduct
