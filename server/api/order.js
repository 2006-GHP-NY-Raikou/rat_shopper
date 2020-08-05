const router = require('express').Router()
const { Order, Stock } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const user = req.user || null
    const newOrder = await Order.build(req.body)
    newOrder.setUser(user)
    await newOrder.save()
    //below assumes req.body === { cart: [items] } and each item corresponds to the full set of item data
    req.body.cart.forEach(async cartItem => {
      const dbItem = await Stock.findByPk(cartItem.stockId)
      await dbItem.update({...req.body, quantity: dbItem.quantity - cartItem.quantity})
    })
    res.send(newOrder)
  } catch (error) {
    next(error)
  }
})

// To do: once we have actual orders to build, test if we can chain the build, setUser, and save
