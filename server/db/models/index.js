const db = require('../db')
const User = require('./user')
const Stock = require('./stock')
const Order = require('./order')

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  User,
  Stock
}
