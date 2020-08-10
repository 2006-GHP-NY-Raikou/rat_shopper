const router = require('express').Router()
const {User} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    //the message doesn't display when a non-admin tries to access the page
    //TODO: find some way to display helpful message
    res.status(404).send('Not an admin!')
  }
}

function isUser(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(404).send('Not a user!')
    return res.status(403).send('Forbidden')
  }
}

function isAdminOrSameUser(req, res, next) {
  if (req.user.isAdmin || req.user.id == req.params.id) {
    next()
  } else {
    return res.status(403).send('Forbidden')
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
router.get('/:id', isUser, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.send(singleUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
