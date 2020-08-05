const db = require('../db')
const Sequelize = require('sequelize')
const crypto = require('crypto')

const User = db.define(
  'user',
  {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.INTEGER
    },
    country: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },
    googleId: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
      beforeBulkCreate: setSaltAndPassword
    }
  }
)

User.prototype.correctPassword = function(pw) {
  return User.encryptPassword(pw, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(text, salt) {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  hash.update(salt)
  return hash.digest('hex')
}

function setSaltAndPassword(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

module.exports = User
