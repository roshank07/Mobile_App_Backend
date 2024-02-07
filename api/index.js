import express  from "express";
import mongoose from "mongoose";
import env from "dotenv";


// dbSinglestore.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL database: ', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });
//console.log(process.env.SECRET);

env.config();
const app=express();
app.use(express.json());

const PORT=process.env.PORT||4000;

// const base_url=process.env.BASE_URL;

mongoose.connect(process.env.dbUrl).then((response)=>console.log("Connected to MongoDb Database"))
.catch((err)=>console.log("Failed to connect MongoDb database",err));

app.get("/health",(req,res)=>{
    res.json({status:200,message:"application running"});
});


import orderRoutes from "./routes/orderRoutes.js";
orderRoutes(app);
import userAutRoutes from "./routes/authenticationRoutes.js";
userAutRoutes(app);


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});