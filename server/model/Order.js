const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    product:[
        {productId:String,quantity:Number}
    ],
    price:{
        type:Number
    },
    confimationStatus:{
        type:String,
        default:"Chưa xác nhận"
    },
    paymentStatus:{
        type:String,
        default:"Chưa thanh toán"
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    district:{
        type:String
    },
    ward:{
        type:String
    },
    shipping:{
        type:String
    },
    description:{
        type:String
    }

},
{timestamps:true})
module.exports=mongoose.model("order",orderSchema)