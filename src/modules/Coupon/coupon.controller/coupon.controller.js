
import CouponModel from "../../../../DB/models/Coupon.model.js";
 import cloudnairy from "../../../utils/cloudnairy.js";
import { asyncHandler } from "../../../utils/errorHandler.js";

export const createCoupon=asyncHandler(
async(req,res,next)=>{
  const {name}=req.body
  if(await CouponModel.findOne({name})){
   return next(new Error('name already exist'))
    }
if(req.file){
    const {secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{
      resource_type: 'auto',
      folder:`${process.env.APP_NAME}/coupon`})
      if(!secure_url){
        return next(new Error('image not found'))
      }
      req.body.image={public_id,secure_url}
    }
    

  const Coupon=CouponModel.create(req.body)
  return res.status(201).json({message:"done", Coupon })
 })


 export const getAll=asyncHandler(
 async(req,res,next)=>{
 const coupon=await CouponModel.find()
 return res.json({message:"done",coupon})
 })


 export const getOne=asyncHandler(
 async(req,res,next)=>{
  const {couponId}=req.params
  const coupon=await CouponModel.findById({_id:couponId})
  if(!coupon){
    return next(new Error ('coupon is not exist',{cause:404}))
  }
  return res.json({message:"done",coupon}) 
  })


  export const updateCoupon=asyncHandler(
  async(req,res,next)=>{
    const {couponId}=req.params
    
    const CouponExist=await CouponModel.findById({_id:couponId})
    if(!CouponExist){
      return next(new Error('invalid ID',{cause:404}))
    }
    if (req.body.name){
      if(await CouponModel.findOne({name:req.body.name})){
        return next (new Error('name already exist',{cause:409}))
      }
      
    }
    if(req.file){
      const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/Coupon`})

    
      await cloudnairy.uploader.destroy(CouponExist.image.public_id)
    req.body.image={public_id,secure_url}
    }
  
 
    const newCoupon=await CouponModel.findByIdAndUpdate({_id:couponId},req.body,{new:true})
    return res.status(200).json({message:'done',newCoupon})
}
  )
 