import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import { generateToken } from '../utils.js'

const userRouter = express.Router()

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // To remove all users
    // await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
  })
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }

    res.status(401).send({ message: 'Invalid User Email or Password' })
  })
)

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    })
    const createdUser = await user.save()
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(createdUser),
    })
  })
)

export default userRouter
