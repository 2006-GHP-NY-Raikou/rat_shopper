const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

async function isUser(req, res, next) {
  if(req.user){
    const order = await Order.findOne({ where: { userId: req.user.id, status: false }})
    next(order.id)
  } else {
    throw new Error('this is not the page you\'re looking for, move along')
  }
}

//GET all orders and their associated product and orderProduct info
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        through: OrderProduct
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//POST new order for session user
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      status: false
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//GET all unbought products and their associated orderProduct info
router.get('/:id', async (req, res, next) => {
  try {
    const currentOrder = await Order.findByPk(req.params.id, {
      include: {
        model: Product,
        through: OrderProduct
      }
    })
    res.json(currentOrder)
  } catch (err) {
    next(err)
  }
})

//PUT status and product quantities on checkout
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Product,
        through: OrderProduct
      }
    })
    await order.update({status: true})
    //the below bit could maybe be in a product route??
    order.products.forEach(async product => {
      const {
        name,
        category,
        sex,
        price,
        imageUrl,
        description,
        orderProduct
      } = product
      await product.update({
        name,
        category,
        sex,
        price,
        imageUrl,
        description,
        orderProduct,
        quantity: product.quantity - product.orderProduct.qty
      })
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    await order.destroy()
    res.status(204).json(order)
  } catch (err) {
    next(err)
  }
})

//POST new product to order
router.post('/:id/orderProducts', isUser, async (req, res, next) => {
  // assuming the product info is in the req.body
  //check if the item already exists in cart
  try {
    const cartItem = await OrderProduct.findOrCreate({
      where: {
        orderId: req.params.id,
        productId: req.body.productId
      }
    })
    let oldQty = 0
    if (cartItem.qty) {
      oldQty = cartItem.qty
    }
    await cartItem.update({
      qty: +req.body.qty + +oldQty,
      priceAtPurchase: req.body.price
    })
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

//PUT unbought products in cart
//again, assumes req.body contains item info
router.put('/:id/orderProducts', async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findOne({
      where: {
        orderId: req.params.id,
        productId: req.body.productId
      }
    })
    await cartItem.update({
      qty: req.body.qty,
      priceAtPurchase: req.body.price
    })
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

//DELETE product(s) from cart
router.delete('/:id/orderProducts', async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findOne({
      where: {
        orderId: req.params.id,
        productId: req.body.productId
      }
    })
    await cartItem.destroy()
    res.status(204).json(cartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
