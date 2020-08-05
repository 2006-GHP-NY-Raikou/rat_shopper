const db = require('../db')
const { Sequelize } = require('sequelize')
const { get } = require('../../api')

const Checkout = db.define('checkout', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
    // get() {
    //   this.
    // }
  }
})

module.exports = Checkout