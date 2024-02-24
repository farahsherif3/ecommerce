
import { Schema,Types,model } from "mongoose";
const CouponSchema=new Schema({
name:{
        type:String,
        required:[true,'name is required'],
        unique:[true, "name must be uniqu"],
        trim:true
},
image:{
    type:Object,
},

amount:{
    type:Number,
    required:true
},
usedBy:[{
    type:Types.ObjectId,
    ref:'User',
  
}],
expireIn:{
    type:Date,
    required:true
},
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:false//turn true after add user
},
},{
    timestamps:true,
   
})

const CouponModel=model('Coupon',CouponSchema)
export default CouponModel