const router = require('express').Router()
const {User} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(404).send('Not an admin!')
  }
}

// for admin to view all users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

//for admin to view single user
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.send(singleUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
