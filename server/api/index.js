const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
<<<<<<< HEAD
=======

>>>>>>> aca7a68816cbc11003ed5ed50b837e248c6bd225
router.use('/order', require('./order'))
router.use('/product', require('./product'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
