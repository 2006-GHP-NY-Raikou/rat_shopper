const db = require('../db')
const Sequelize = require('sequelize')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      'dumbo',
      'sphynx',
      'husky',
      'rex',
      'fuzz',
      'blue',
      'black',
      'satin',
      'hat',
      'shoes',
      'jewelry',
      'clothes',
      'props'
    ),
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM('male', 'female')
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
