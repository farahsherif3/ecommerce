

import { string } from "joi";
import { Schema,Types,model } from "mongoose";
const orderSchema=new Schema({
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true//turn true after add user
},
products:[
    {
        name:{
            type:String,
            required:true,
            min:3,
            max:30
        },
        productId:{
            type:Types.ObjectId,
            required:true,
            ref:'Product',
            unique:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        unitPrice:{
            type:Number,
            required:true,
            min:1
        },
        totalPrice:{
            type:Number,
            required:true,
            min:1
        }
    }
],
address:{
    type:String,
required:true,
},
note:String,
phone:{
    type:[String],
    required:true
},
paymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
},
couponId:{
    type:Types.ObjectId,
    ref:'Coupon'
},
subPrice:{
    type:Number,
},
finlPrice:{
    type:Number,
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User'
},
status:{
    type:String,
    enum:['onway','placed','canceled','rejected','delvired','waitForPayment'],
    default:'placed'
},
reason:String

},{
    timestamps:true,

})


const OrderModel=model('Order',orderSchema)
export default OrderModel