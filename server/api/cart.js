const router = require('express').Router()
const {Order, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        status: false
      },
      include: Product
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
