import { Schema,model } from "mongoose";
import { Types } from "mongoose";
const UserSchema=new Schema({
    userName:{
        type:String,
        require:[true,'name is required'],
        min:[2,'min is 2'],
        max:[20,'max is 20'],
        lowercase:true

    
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    
    },
    email:{
        type:String,
        unique:[true,'email must be unique'],
        required:[true,'email is required'],
        lowercase:true
    },
    password:{
        type:String,
        unique:true,
        required:[true,'password is required']
    },
    age:Number,
    phone:String,
    gender:{
        type:String,
        enum:['female','male'],
        default:'male'
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },
    
    picture:String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    isDeleted: {
        type:Boolean,
        index: true,
        default: false
      },
      code:String,
      wishList:[
        {
            type:Types.ObjectId,
            ref:'Product'
         
        }
      ]
    
     },{timestamps:true})
     const UserModel=model('User',UserSchema)
     export default UserModel