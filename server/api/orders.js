const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(404).send('Not an admin!')
  }
}

async function isUser(req, res, next) {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {userId: req.user.id, status: false}
      })
      req.orderId = order.id
      next()
    } else {
      throw new Error("this is not the page you're looking for, move along")
    }
  } catch (err) {
    next(err)
  }
}

//GET all orders and their associated product and orderProduct info
router.get('/', isAdmin, async (req, res, next) => {
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

//POST new order for guest checkout
//there might be a way to combine this with user checkout
//investigate if we have time
router.post('/guest/checkout', async (req, res, next) => {
  try {
    const order = await Order.create({status: true})
    //combines order with products
    req.body.forEach(async product => {
      await OrderProduct.create({
        productId: product.id,
        orderId: order.id,
        qty: product.qty,
        priceAtPurchase: product.price
      })
      //updates product quantities
      const p = await Product.findByPk(+product.id)
      await p.update({quantity: p.quantity - product.qty})
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//GET all unbought products and their associated orderProduct info - for users only
router.get('/cart', isUser, async (req, res, next) => {
  try {
    const currentOrder = await Order.findByPk(req.orderId, {
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

//POST new product to order
router.post('/cart', isUser, async (req, res, next) => {
  // assuming the product info is in the req.body
  //check if the item already exists in cart
  try {
    const [cartItem] = await OrderProduct.findOrCreate({
      where: {
        orderId: req.orderId,
        productId: req.body.productId
      }
    })
    let oldQty = 0
    if (cartItem.qty) {
      oldQty = cartItem.qty
    }
    await cartItem.update({
      qty: +req.body.qty + +oldQty,
      priceAtPurchase: req.body.price * (+req.body.qty + +oldQty)
    })
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

//PUT order status and product quantities on checkout
router.put('/cart', isUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.orderId, {
      include: {
        model: Product,
        through: OrderProduct
      }
    })
    await order.update({status: true})
    //update quantities of products in db
    order.products.forEach(async product => {
      await product.update({
        quantity: product.quantity - product.orderProduct.qty
      })
    })

    await Order.create({
      userId: order.userId
    })

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/cart', isUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.orderId)
    await order.destroy()
    res.status(204).json(order)
  } catch (err) {
    next(err)
  }
})

//PUT unbought products in cart
//again, assumes req.body contains item info
router.put('/cart/orderProducts', isUser, async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findOne({
      where: {
        orderId: req.orderId,
        productId: req.body.productId
      }
    })
    await cartItem.update({
      qty: req.body.qty,
      priceAtPurchase: req.body.price * req.body.qty
    })
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

//DELETE product(s) from cart
//front-end: delete button for each product or quantity reduced to 0
router.delete('/cart/orderProducts', isUser, async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findOne({
      where: {
        orderId: req.orderId,
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
