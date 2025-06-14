const mongoose=require("mongoose");

const oredrItemSchema=new mongoose.Schema({
    name: {type:String,required:true },
    qty: {type:Number,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,

    }
})
const orderSchema=mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [oredrItemSchema],
    shippingAddress: {
        address: {type:String,required:true},
        city:{type:String,required:true},
        postalcode:{type:String,required:true},
        country:{type:String,required:true},
    },
    paymentMethod:{type:String,required:true,default:"Paypal"},
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false,
    },
    deliveredAt:{
        type:Date,
    },
},
{
    timestamps:true}
);


module.exports=mongoose.model("Order",orderSchema)