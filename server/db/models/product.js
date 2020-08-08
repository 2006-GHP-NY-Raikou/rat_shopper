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
    allowNull: true,
    validate: {
      isIn: {
        args: [
          [
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
          ]
        ],
        msg: 'category should be one of the pre-set categories'
      }
    }
  },
  sex: {
    type: Sequelize.ENUM('male', 'female'),
    allowNull: true,
    validate: {
      isIn: {
        args: [['male', 'female']],
        msg: 'sex has to be either male, female, or null'
      }
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
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
