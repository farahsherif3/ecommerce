import cartModel from "../../../../DB/models/Cart.model.js";
import productModel from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/errorHandler.js";

export const addToCart=asyncHandler(
    async(req,res,next)=>{
        const{_id}=req.user
        const{productId,quantity}=req.body
        const cart= await cartModel.findOne({userId:_id})
        const product=await productModel.findOne(
            {_id:productId , isDeleted:false ,stock:{$gte:quantity} } )
            if(!product){
                return next(new Error('invalid productid',{cause:404}))
            }
        if(!cart){
            const data={
                userId:_id,
                 products: [
                    {
                    productId : product._id,
                     quantity
                   }
            ]           
         }
         const newCart=await cartModel.create(data)
         return res.status(201).json({messagr:'done',newCart})
        }  

//product Exist in cart
let exist=false
        for (let product of cart.products) {
            if(product.productId.toString()==productId){
            product.quantity=quantity
            exist=true
            break;
        }
    }
       if(!exist){
        const add=await cartModel.findByIdAndUpdate({_id:cart._id},{ products:cart.products},{new:true})
        return res.status(200).json({message:'done',add})
       } 
    }
)

export const deleteFromCart=asyncHandler(
    async(req,res,next)=>{
        const{_id}=req.user
        const{productId}=req.params
        const cart =await cartModel.findOne({userId:_id})
        if(!cart){
            return next(new Error('cart not found',{cause:404}))
        }
        const newCart=await cartModel.findByIdAndUpdate({_id:cart._id},{
            $pull:{
                products:{
                    productId:{ $in: req.params.productId }
                }
            }
        },{new:true})
        return res.status(200).json({message:"done",newCart})
    }
)
export const clearProdauctsFromCart=asyncHandler(
    async(req,res,next)=>{
        const{_id}=req.user

        const cart =await cartModel.findOne({userId:_id})
        if(!cart){
            return next(new Error('cart not found',{cause:404}))
        }
        const newCart=await cartModel.findByIdAndUpdate({_id:cart._id},  { products:[] } ,{new:true})
        return res.status(200).json({message:"done",newCart})
    }
)



