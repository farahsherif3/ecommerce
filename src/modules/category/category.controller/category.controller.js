
import slugify from "slugify";
import categoryModel from "../../../../DB/models/Category.model.js";
import slug from "slugify";
 import cloudnairy from "../../../utils/cloudnairy.js";

export const createCategory=async(req,res,next)=>{
  const {name}=req.body
  
  if(await categoryModel.findOne({name})){
   // return res.json({massage:' name already exist'
   return next(new Error('name already exist'))
    }
   /* const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/category`})
    if(!secure_url){
    //return res.json({message:"image not found"})
    return next(new Error('image not found'))

  }
  req.body.image={public_id,secure_url}*/
  req.body.slug= slugify(req.body.name)
  //req.body.createdBy=req.user._id
  const category=categoryModel.create(req.body)
  
  return res.json({message:"done",category})
 }
 export const getAll=async(req,res,next)=>{
 const catgory=await categoryModel.find()/*.populate([{
  path:'subCategory'
 }])*/
 return res.json({message:"done",catgory})
 }
 export const getOne=async(req,res,next)=>{
  const {categoryId}=req.params
  const catgory=await categoryModel.findById({_id:categoryId}).populate([
    {
      path:'SubCategory'
    }
  ])
  return res.json({message:"done",catgory}) 
  }
  export const updateCategory=async(req,res,next)=>{
    const {CategoryId}=req.params
    
    const CategoryExist=await categoryModel.findById({_id:CategoryId})
    if(!CategoryExist){
      return next(new Error('invalid ID',{cause:404}))
    }
    if (req.body.name){
      if(await categoryModel.findOne({name:req.body.name})){
        return next (new Error('name already exist',{cause:409}))
      }
      req.body.slug=slugify(req.body.name)
    }
    if(req.file){
      const {secure_url,public_id} =await cloudnairy.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/category`})
      await cloudnairy.uploader.destroy(CategoryExist.image.public_id)
      req.body.image={public_id,secure_url}
    }
    
    
    req.body.updatedBy=req.user._id
    const newCategory=await categoryModel.findByIdAndUpdate({_id:CategoryId},req.body,{new:true})
    return res.status(200).json({message:'done',newCategory})
  }
 
 