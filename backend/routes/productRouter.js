import express from 'express'
import data from '../data.js'
import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router()

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    if (products) {
      res.send(products)
    } else {
      res.status(404).send({ message: 'Products not found' })
    }
  })
)

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // To remove all products
    // await Product.deleteMany({})
    // create Sample products
    const createdProucts = await Product.insertMany(data.products)
    res.send({ createdProucts })
  })
)

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send({ message: 'Product not found' })
    }
  })
)

export default productRouter
