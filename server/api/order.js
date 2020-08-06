const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id })
    const newOrderProduct = await OrderProduct.create({
      orderId: newOrder.id,
      productId: req.body.productId,
      qty: 1
    })
    res.json(newOrderProduct)
  } catch (err) {
    next(err)
  }
//in order to create a new row in orderProduct, we need to order.addProduct(product)
//so we need to find the order
})

router.put('/', async (req, res, next) => {
  //add products to order
  //send order id in req.body
  const order = await Order.findOne({
    where: {
      userId: req.user.id,
      status:false
    }
  })
  const cartItem = await OrderProduct.findOrCreate({
    
  })
  //adding new item to cart
  //or adding duplicate
  res.json(newOrderProduct)

})

module.exports = router
//Order.setUser(user)
//when item is added to cart:
//make a new order, associate it with the user and stock
//on checkout:
//find all orders associated with user set to false, set to true

//when we need to retrieve past orders, we find from the checkout table so we can also get the price at purchase
//when we need to retrieve stock for the cart, we find orders that are set to false

//To add an order(post),
//1.) find existing order associated with that user (findOne where userId: req.user, !status)
//if order does exist, return order
//if order does not exist, we need to create the order
// ex: const newOrder = Order.create()
//   newOrder.setUser(req)
// 2.) Then we need to add the item to the order/cart
// we need req.body.product.id, req.body.qty
//first check to see if that item is already in their cart (use checkout model for this)
// ex: const item = checkout.findOne(where: {productId: req.body.product.id, orderId: newOrder.id})
//what this is doing is going into the checkout model, which joins order and product, and finding whether the order we are on has existing products
//if the item IS already in the checkout table with an existing orderId, then we need to update the cart's quantity
//need a quantity field in checkout?!?!
//unless this where we update product table?
//ex: item.update({qty: item.qty + req.body.qty})
// if the item IS NOT, then we need to create it in checkout
// ex: checkout.create({orderId: newOrder, productId: req.body.productId, qty(?) })
