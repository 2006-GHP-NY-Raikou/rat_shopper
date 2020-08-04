const User = require("./user");
const Stock = require("./stock");
const db = require("./db");
const Order = require("./order")

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  User,
  Stock
};
