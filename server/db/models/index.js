const db = require('../db')
const User = require('./user')
const Stock = require('./stock')
const Order = require('./order')
const Checkout = require('./checkout')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Stock, {through: Checkout})
Stock.belongsToMany(Order, {through: Checkout})

module.exports = {
  db,
  User,
  Stock,
  Order,
  Checkout
}
