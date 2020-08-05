const router = require('express').Router()
const {Order} = require('../db')

router.post('/', async (req, res, next) => {
  try {
    const user = req.user || null
    const newOrder = Order.build(req.body)
    newOrder.setUser(user)
    newOrder.save()
    res.send(newOrder)
  } catch (error) {
    next(error)
  }
})
