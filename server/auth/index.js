const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      //findOrCreate open order associated with user
      await Order.findOrCreate({
        where: {
          userId: user.id,
          status: false
        }
      })
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

//map through each product.orderProduct, if 2 products are the same, instead of
//displaying a second copy of the item, we combine them for front-end display

//create new order for new users
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    if (user) {
      req.login(user, err => (err ? next(err) : res.json(user)))
      //create a blank order for the newly signed-up user:
      const order = await Order.create({userId: user.id})

      console.log('this is the signed-up user order:', order) // show the order
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
