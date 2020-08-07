const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

//Below are rough draft routes for checkout/orders/carts... definitely need to find a way to make it cleaner later

//For Tier 1- the following routes do not address order history!

//Get route intended for when a user is on their CART page:
// Here, we are defining CART to mean all the products associated with their ORDER (the order with status FALSE) in their CURRENT session
//The user wants to view all the products (can be more than 1) in their CART
//The order's STATUS IS FALSE because it is stil "in progress"!
//So with the GET route, we want to find all the products associated with the current order
router.get('/currentOrderInCart', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      if (order) {
        const findAllOrderProducts = await OrderProduct.findAll({
          where: {
            orderId: order.id
          }
        })
        //so we can return an array of objects that stores the product information
        const orderProductObj = findAllOrderProducts.reduce((obj, product) => {
          obj[product.productId] = product.qty
        }, {})
        res.json(orderProductObj)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//Still confused on how to create an instance of an order...  Maybe with sessions or passport, we can automatically create an instance of an order in the Order model once a session starts?
//Not sure how to do that, but I think somehow we have to tether our POST route to either a button or action that only happens ONCE.
//That would be better because then the POST route only happens ONCE.
//I think it got confusing previously, but I think we would only need to have only ONE instance of an order with a FALSE status in the Order Model.  Any other order (for order history) for a user would have a status of TRUE to signify that the order was closed.(This would be updated in the PUT for checkout)

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({userId: req.user.id})
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

//Also, this way we can deal with adding instances in the OrderProduct model separately.
//Meaning, on the single product page, we can have a button that says "Add To Cart"
//Once the button is clicked, this route will automatically create an instance in the OrderProduct model with the associated product and current order
//We can definitely leverage req.param.id here

router.post('/:productId/addToOrder', async (req, res, next) => {
  try {
    //for now, we'd need to find the associated order for the req.user, but thinking this could be rectified if we somehow tie sessions and Order model
    const order = await Order.findAll({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    //Leaving priceAtPurchase blank, maybe we need a default value?  Then at checkout we use a PUT to update?
    const createOrderProduct = await OrderProduct.create({
      productId: req.params.productId,
      orderId: order.id
    })
    res.json(createOrderProduct)
  } catch (err) {
    next(err)
  }
})

//As the routes are written now, once the "Add to Cart" button is clicked, think we need to somehow reflect on the page that if they want to add more, the single product pages updates the button to have an option to increment/decrement qty...
//But if we are on our cart page, an want to update, maybe we put an "update" button next to each product in our cart that will redirect user back to a single product update page
//This page looks like the single product page except that instead of "Add to Cart", it has a button to decrement or increment quantity of this product
//Purpose of this is because we can now use a PUT request to update the OrderProduct model for ONLY when there ALREADY is an instance of that product associated with the current order
//For now, I have two puts, but I think in the future we can consolidate?

router.put('/:productId/increment', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      const productExist = await OrderProduct.findOne({
        where: {
          productId: req.params.productId,
          orderId: order.Id
        }
      })
      if (productExist) {
        const updateProduct = await productExist.update({
          qty: productExist.qty + 1
        })
        res.json(updateProduct)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId/decrement', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      const productExist = await OrderProduct.findOne({
        where: {
          productId: req.params.productId,
          orderId: order.Id
        }
      })
      if (productExist) {
        const updateProduct = await productExist.update({
          qty: productExist.qty - 1
        })
        res.json(updateProduct)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//Thinking on the same update single product page, we can add a remove button as well, so we can leverage req.params
router.delete('/:productId/delete', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          status: false
        }
      })
      const findProduct = Product.findByPk(req.params.productId)
      if (order) {
        await order.removeProduct(findProduct)
      }
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//Finally, for the "Submit CHeckout" button...
//For tier one, not accounting for guest ...
router.put('/checkoutCart/user', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    await order.update({status: true})
    //I think, here we need to somehow leverage the GET 'currentOrderInCart' route because that return an object with the products associated with the order
    //Then we can loop through that object, find the productId and then go into our Product model and update qty
    //Similarly, we can use that productId we find to go retrieve the price and our OrderProduct model with those prices
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
