
import slugify from "slugify";
import categoryModel from "../../../../DB/models/Category.model.js";
import subCategoryModel from '../../../../DB/models/subCategoery.model.js'
import slug from "slugify";
 import cloudnairy from "../../../utils/cloudnairy.js";
 

export const createSubCategory=async(req,res,next)=>{
  const {name}=req.body
  const {categoryId}=req.params
  const category =await categoryModel.findOne({_id:categoryId})
  if(!category){
    return next(new Error('category doesnot exist'))
  }
  if(await subCategoryModel.findOne({name})){
   
   return next(new Error('name already exist',{cause:409}))
    }
  const{secure_url,public_id}=await cloudnairy.uploader.upload(req.file.path,{folder:'/category/subcategory'})
  if(!secure_url){

    return next(new Error('image not found'))

  }
  req.body.image={public_id,secure_url}
  req.body.slug= slugify(name)
  req.body.categoryId=categoryId
  const subCategoery=subCategoryModel.create(req.body)
  
  return res.status(201).json({message:"done",subCategoery})
 }
 export const getSubCategory=async(req,res,next)=>{
    const{subCategoeryId}=req.params
 const subCatgory=await subCategoryModel.find({subCategoeryId}).populate([
  {
    path:'Category'
  }
 ])
 return res.json({message:"done",subCatgory})
 }
 export const getAllById=async(req,res,next)=>{
  const {categoryId}=req.params
  const subcategory=await subCategoryModel.findById({categoryId}).populate([
    {
      path:'Category'
    }
  ])
  return res.json({message:"done",subcategory}) 
  }

  export const updateSubCategory=async(req,res,next)=>{
    const {subCategoryId}=req.params
    
    const subCategoryExist=await subCategoryModel.findById({_id:subCategoryId})
    if(!subCategoryExist){
      return next(new Error('invalid ID',{cause:404}))
    }
    if (req.body.name){
      if(await subCategoryModel.findOne({name:req.body.name})){
        return next (new Error('name already exist',{cause:409}))
      }
      req.body.slug=slugify(req.body.name)
    }
    if(req.file){
     const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/category/${req.params.categoryId}/subcategory`})
    }
    
    await cloudnairy.uploader.destroy(subCategoryExist.image.public_id)
    req.body.image={public_id,secure_url}
    const newSubCategory=await subCategoryModel.findByIdAndUpdate({_id:subCategoryId},req.body,{new:true})
    return res.status(200).json({message:'done',newSubCategory})
  }
 