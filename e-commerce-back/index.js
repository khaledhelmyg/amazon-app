import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import path from 'path'
import productRouter from './routes/productRoutes.js'
import seedRouter from './routes/seedRoutes.js'
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config()
const app=express()
const PORT=process.env.PORT||5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
app.use('/api/seed',seedRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)
app.use('/api/users',userRouter)

const __dirname=path.resolve()
app.use(express.static(path.join(__dirname,'/e-com-front/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/e-com-front/build/index.html'))
})
app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
})
app.listen(PORT,()=>{
    console.log(`e-commerce is running at http://localhost:${PORT}`)
})