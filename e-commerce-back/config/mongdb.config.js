import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectioUri = process.env.MONGODB_URI

mongoose.connect(connectioUri)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
