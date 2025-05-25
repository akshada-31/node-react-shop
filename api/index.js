const express = require("express");
const app = express();
const dotenv = require("dotenv");
const products=require("./data/Products")
dotenv.config();
const PORT=process.env.PORT;

const mongoose=require("mongoose");
app.use(express.json());

//connect db
mongoose.connect(process.env.MONGOOSEDB_URL).then(()=>console.log("db connected")).then((err)=>{
    err;
})
//vaidyaakshada31
//K9ZEs2UFsQ73NQe3
//mongodb+srv://vaidyaakshada31:K9ZEs2UFsQ73NQe3@cluster0.g09eziv.mongodb.net/REACT-NODE-APP
const databaseSeeder = require('./databaseSeeder')
const userRoute=require("./routes/User");
const productRoute=require("./routes/Product");
const orderRoute = require("./routes/Order");
app.use(express.json());
//database seeder routes
app.use('/api/seed',databaseSeeder ) 
//routes for users
//api/users/login
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/orders',orderRoute);
app.listen(PORT || 9000,()=>{
    console.log(`server listening on port ${PORT}`);
});