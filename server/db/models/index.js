const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const orderProduct = require('./orderProduct')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: orderProduct})
Product.belongsToMany(Order, {through: orderProduct})

module.exports = {
  db,
  User,
  Product,
  Order,
  orderProduct
}
