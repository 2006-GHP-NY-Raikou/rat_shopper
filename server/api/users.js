const router = require('express').Router()
const {User, OrderProduct} = require('../db/models')

// for admin to view all users
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

//to view single user, for admin and individual user to view info
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.send(singleUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
