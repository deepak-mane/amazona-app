import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js';

dotenv.config()
const app = express();

// To parse JSON data in the middleware (For incoming requests)
app.use(express.json())
// To covert incoming html data to req.body format
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.use('/api/users', userRouter )
app.use('/api/products', productRouter )

app.get('/', (req, res) => {
  res.send('Server is ready!!!')
})

app.use((err, req, res, next)=>{
  res.status(500).send({message : err.message})
next()
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Serve at https://localhost:${PORT}`)
})