
import { Schema,Types,model } from "mongoose";
const categorySchema=new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        unique:[true, "name must be uniqu"],
        trim:true
},
image:{
    type:Object,
    required:[true,'image is required']// turn true after malter

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
slug:{
    type:String,
    required:[true,'slug is required'],
    unique:[true, "slug must be uniqu"],
    trim:true,
    lowercase:true
},
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

/*categorySchema.virtual('subCategory',{
    ref:'SubCategory',
    localField:'_id',
    foreignField:'categoryId'
})*/
const categoryModel=model('Category',categorySchema)
export default categoryModel