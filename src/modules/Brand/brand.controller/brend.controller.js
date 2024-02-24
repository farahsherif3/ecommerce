
import slugify from "slugify";
import categoryModel from "../../../../DB/models/Brand.model.js";
import slug from "slugify";
 import cloudnairy from "../../../utils/cloudnairy.js";

export const createBrand=async(req,res,next)=>{
  const {name}=req.body
  
  if(await brandModel.findOne({name})){
   // return res.json({massage:' name already exist'
   return next(new Error('name already exist'))
    }
    const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/brand`})
    if(!secure_url){
    //return res.json({message:"image not found"})
    return next(new Error('image not found'))

  }
  req.body.image={public_id,secure_url}
  req.body.slug= slugify(req.body.name)
  const brand=brandModel.create(req.body)
  
  return res.json({message:"done",brand})
 }
 export const getAllBrand=async(req,res,next)=>{
 const brand=await brandModel.find().populate([{
  path:'subCategory'
 }])
 return res.json({message:"done",brand})
 }
 export const getOneBrand=async(req,res,next)=>{
  const {brandId}=req.params
  const brand=await brandModel.findById({_id:brandId}).populate([
    {
      path:'SubCategory'
    }
  ])
  return res.json({message:"done",brand}) 
  }
  export const updateBrand=async(req,res,next)=>{
    const {brandId}=req.params
    
    const brandExist=await brandModel.findById({_id:brandId})
    if(!brandExist){
      return next(new Error('invalid ID',{cause:404}))
    }
    if (req.body.name){
      if(await brandModel.findOne({name:req.body.name})){
        return next (new Error('name already exist',{cause:409}))
      }
      req.body.slug=slugify(req.body.name)
    }
    if(req.file){
      const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/brand`})
    }
    
    await cloudnairy.uploader.destroy(CategoryExist.image.public_id)
    req.body.image={public_id,secure_url}
    const newBrand=await brandModel.findByIdAndUpdate({_id:brandId},req.body,{new:true})
    return res.status(200).json({message:'done',newBrand})
  }
 
 