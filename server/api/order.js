const router = require('express').Router()
const {Order, Stock} = require('../db/models')

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
//if order exists, find order then update that order to add asscociated product

router.get('/', async (req, res, next) => {})

module.exports = router
//Order.setUser(user)
//when item is added to cart:
//make a new order, associate it with the user and stock
//on checkout:
//find all orders associated with user set to false, set to true

//when we need to retrieve past orders, we find from the checkout table so we can also get the price at purchase
//when we need to retrieve stock for the cart, we find orders that are set to false
