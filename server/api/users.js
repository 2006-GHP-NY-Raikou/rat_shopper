const router = require('express').Router()
const{ User, Order } = require('../db/models')

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
    const singleUser = await User.findAll({
      where: {
        id: req.params.id
      },
      include: {
        model: Order
      }
    })
    res.send(singleUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router

//for users to checkout
// router.post('/:id/checkout', async (req, res, next) => {
//     try {
//         const newOrder = await Order.create({
//             userId

//         })
//     } catch (error) {

//     }
// })
