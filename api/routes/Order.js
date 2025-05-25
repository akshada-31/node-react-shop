const express=require("express");
const orderRoute=express.Router();
const protect=require("../middleware/Auth");
const asyncHandler=require("express-async-handler");
const Order=require("../models/Order");
orderRoute.post("/",protect,asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethods,shippingPrice,taxPrice,totalPrice,price,}=req.body;
    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error("no order item found!");
    }else{
        const order=new Order({
            orderItems,
            shippingAddress,
            paymentMethods,
            shippingPrice,
            taxPrice,
            totalPrice,
            price,
            user:req.user._id
        });
        const createdOrder=await order.save();
        res.status(201).json(createdOrder)
    }
})
);
//order payment route
orderRoute.put('/:id/payment',protect,asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    console.log(order);
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            updated_time:req.body.updated_time,
            email_address:req.body.email_address
        }
        const updatedOrder=await order.save();
        console.log(updatedOrder);
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order Not Found");
    }
})
);


orderRoute.get("/",protect,asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id}).sort({_id:-1})
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(404);
        throw new Error("Orders not found");
    }
})
);
//get one order by id
orderRoute.get("/:id",protect,asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate("user","email");
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Orders not found");
    }
}));
module.exports=orderRoute;