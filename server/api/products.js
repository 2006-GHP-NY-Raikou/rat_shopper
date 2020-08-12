const router = require('express').Router()
const {Product} = require('../db/models')

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(404).send('Not an admin!')
  }
}

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/random', async (req, res, next) => {
  try {
    const products = await Product.findAll().filter(r => r.sex)
    const idx = Math.floor(Math.random() * products.length)
    res.json(products[idx].id)
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

router.post('/', isAdmin, async (req, res, next) => {
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

// eslint-disable-next-line complexity
router.put('/:id', isAdmin, async (req, res, next) => {
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

    const updatedProduct = await product.update({
      name: name || product.name,
      category: category || product.category,
      sex: sex || product.sex,
      price: price || product.price,
      quantity: quantity || product.quantity,
      imageUrl: imageUrl || product.imageUrl,
      description: description || product.description
    })
    res.status(201).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.status(204).send('deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router
