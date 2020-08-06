const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    } = req.body
    const newProduct = await Product.create({
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    } = req.body

    const product = await Product.findByPk(req.params.id)

    await Product.update({
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    })

    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.status(204).send('deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router
