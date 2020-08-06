const router = require('express').Router()
const { Stock } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const stock = await Stock.findAll()
    res.json(stock)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const stock = await Stock.findByPk(req.params.id)
    res.json(stock)
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
    const newStock = await Stock.create({
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    })
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

    const stock = await Stock.findByPk(req.params.id)

    await stock.update({
      name,
      category,
      sex,
      price,
      quantity,
      imageUrl,
      description
    })

    res.status(201).json(stock)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const stock = await Stock.findByPk(req.params.id)
    await stock.destroy()
    res.status(204).send('deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router
