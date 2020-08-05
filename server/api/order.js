const router = require('express').Router()
const {Order} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const user = req.user || null
    const newOrder = await Order.build(req.body)
    newOrder.setUser(user)
    await newOrder.save()
    res.send(newOrder)
  } catch (error) {
    next(error)
  }
})

// To do: once we have actual orders to build, test if we can chain the build, setUser, and save
