const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    //the message doesn't display when a non-admin tries to access the page
    //TODO: find some way to display helpful message
    res.status(404).send('Not an admin!')
  }
}

function isAdminOrSameUser(req, res, next) {
  if (req.user.isAdmin || req.user.id === +req.params.id) {
    next()
  } else {
    return res.status(403).send('Forbidden')
  }
}

// for admin to view all users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

//for any user to view other users, not their own profile page
router.get('/:id', isAdminOrSameUser, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/orders', isAdminOrSameUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: +req.params.id,
        status: true
      },
      include: {
        model: Product,
        through: OrderProduct
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
