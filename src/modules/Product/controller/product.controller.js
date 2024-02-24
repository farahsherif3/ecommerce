import categoryModel from "../../../../DB/models/Category.model.js"
import brandModel from '../../../../DB/models/Brand.model.js'
import subCategoryModel from "../../../../DB/models/subCategoery.model.js"
import { asyncHandler } from "../../../utils/errorHandler.js"
import slugify from "slugify"
import { nanoid } from "nanoid"
import productModel from "../../../../DB/models/product.model.js"
import cloudnairy from 'cloudinary'


export const createProduct=asyncHandler(
    async(req,res,next)=>{
        const {categoryId,subCategoryId,brandId}=req.body
    if(!await categoryModel.findById({_id:categoryId})){
        return res.next(new Error('invalid category id',{cause:404}))
    }
    if(!await brandModel.findById({_id:brandId})){
        return res.next(new Error('invalid brand id',{cause:404}))
    }
    if(!await subCategoryModel.findById({_id:subCategoryId, categoryId})){
        return res.next(new Error('invalid subCategory id',{cause:404}))
    }
req.body.slug=slugify(req.body.name,{
    trim:true,
    lower:true
})

req.body.finalPrice=price-(((price*discount)||0)/100)


req.body.customId=nanoid()
const {secure_url,public_id} =await cloudnairy.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_NAME}/product/${req.body.customId}/mainImage`})
if(!secure_url){
    return next(new Error('image not found'))
}
req.body.mainImage={public_id,secure_url}

if (req.files.subImages.length){
    let images=[]
    for (const image of req.files.subImages) {
        const {secure_url,public_id} =await cloudnairy.uploader.upload(image.path,{folder:`${process.env.APP_NAME}/product/${req.body.customId}/mainImage`})
         if(!secure_url){
         return next(new Error('image not found'))
} 
images.push({secure_url,public_id})
    }
 req.body.subImages=images
   
}
 req.body.createdBy=req.user._id
const product =await productModel.create(req.body)
return res.status(201).json({message:'done',product})



    }
)


export const updateProduct=asyncHandler(
    async(req,res,next)=>{
        const{productId}=req.params
       
    const product=await productModel.findById({_id:productId})
    if(!product){
        return res.next(new Error('product is not exist',{cause:404}))
    }
    if(req.body.brandId && !await brandModel.findById({_id:req.body.brandId })){
        return res.next(new Error('invalid subCategory id',{cause:404}))
    }
    if(req.body.subCategoryId && !await subCategoryModel.findById({_id:req.body.subCategoryId})){
        return res.next(new Error('invalid subCategory id',{cause:404}))
    }
    if(req.body.name){
        if(await productModel.findOne({name:req.body.name})){
            return res.next(new Error('name already exist',{cause:409}))
        }
     req.body.slug=slugify(req.body.name,{
         trim:true,
         lower:true
})
}
req.body.finalPrice=req.body.price||product.price-((req.body.price||product.price*req.body.discount||product.discount||0)/100)

if(req.files?.mainImage?.length){
const {secure_url,public_id} =await cloudnairy.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APP_NAME}/product/${req.body.customId}/mainImage`})
   if(!secure_url){
    return next(new Error('image not found'))
        }
        await cloudnairy.uploader.destroy(product.mainImage.public_id)
      req.body.mainImage={public_id,secure_url}
}


if (req.files?.subImages?.length){
    
    for (const image of req.files.subImages) {
        const {secure_url,public_id} =await cloudnairy.uploader.upload(image.path,{folder:`${process.env.APP_NAME}/product/${req.body.customId}/mainImage`})
         if(!secure_url){
         return next(new Error('image not found'))
} 
product.subImages.push({secure_url,public_id})
    }
 req.body.subImages=product.subImages
   
}
 req.body.updatedBy=req.user._id
const newProduct =await productModel.findOneAndUpdate({_id:productId},req.body,{new:true})
return res.status(201).json({message:'done',newProduct})



    }
)

export const allProduct=asyncHandler(
    async(req,res,next)=>{
        const allProduct=await productModel.find({})
        return res.status(200).json({message:"done",allProduct})
    }
)
export const getOneProduct=asyncHandler(
    async(req,res,next)=>{
        const{productId}=req.params
        const product=await product.findById({_id:productId})
        if(!product){
            return next(new Error('product is not exist',{cause:404}))
        }
        return res.status(200).json({message:"done",product})
    }
)