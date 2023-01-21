import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from 'dotenv';



 const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

app.use(cors());
app.use("/posts", postRoutes);
app.use('/user',userRoutes)

app.get('/',(req,res,next)=>{
  res.send("App is running");
})
 
 /* const CONNECTION_URL =
  "mongodb+srv://amr:amr2242001@cluster0.wdl7qor.mongodb.net/?retryWrites=true&w=majority"; */ 
 const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is Running in port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  }); 