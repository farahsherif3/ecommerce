

import { Schema,Types,model } from "mongoose";
const productSchema=new Schema({
name:{
        type:String,
        required:[true,'name is required'],
        unique:[true, "name must be uniqu"],
        trim:true
},
mainImage:{
    type:Object,
    required:[true,'mainImage is required']
},
subImages:[{
    type:Object,
    required:[true,'subImage is required']// turn true after malter

}],
description:String,


slug:{
    type:String,
    required:[true,'slug is required'],
    unique:[true, "slug must be uniqu"],
    trim:true,
    lowercase:true
},
categoryId:{
    type:Types.ObjectId,
    ref:'Category',
    required:true//turn true after add user
},
subCategoryId:{
    type:Types.ObjectId,
    ref:'SubCategory',
    required:true//turn true after add user
},
brandId:{
    type:Types.ObjectId,
    ref:'Brand',
    required:true//turn true after add user
},
discount:{
    type:Number,
    default:0
},
stock:{
    type:Number,
    required:[true,'stock is required']
},
price:{
    type:String,
    required:[true,'price is required'],
    min:1
},
finalPrice:{
    type:String,
    
},
createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:false//turn true after add user
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:false//turn true after add user
},
isDeleted:{
    type:Boolean,
    default:false
},
customId:{
    type:String,
    required:true
},
color:[String],
size:[String],
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


const productModel=model('Product',productSchema)
export default productModel