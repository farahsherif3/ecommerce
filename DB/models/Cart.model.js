

import { Schema,Types,model } from "mongoose";
const cartSchema=new Schema({
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true//turn true after add user
},
products:[
    {
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
        }
    }
]

},{
    timestamps:true,

})


const cartModel=model('Cart',cartSchema)
export default cartModel