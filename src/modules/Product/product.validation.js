import joi from "joi";
import { generalFields } from "../../utils/generalFeildes.js";

export const createProductSchema=joi.object({
    name:joi.string().trim().required(),
    mainImage:generalFields.file.required(),
    subImages:joi.array().items(generalFields.file).required(),
    categoryId:generalFields.id.required(),
    subCategoryId:generalFields.id.required(),
    breandId:generalFields.id.required(),
    price:joi.number().min(1).required(),
    discount:joi.number(),
    description:joi.string(),
    stock:joi.number().required(),
    color:joi.string(),
    size:joi.string(),
    authorization:joi.string().required()
}).required()



export const updateProductSchema=joi.object({
    name:joi.string().trim(),
    mainImage:generalFields.file,
    subImages:joi.array().items(generalFields.file),
    categoryId:generalFields.id.required(),
    subCategoryId:generalFields.id.required(),
    breandId:generalFields.id.required(),
    price:joi.number().min(1),
    discount:joi.number(),
    stock:joi.number(),
    color:joi.string(),
    size:joi.string(),
    authorization:joi.string().required()
}).required()

export const getOneProductSchema=joi.object({
    productId:generalFields.id.required(),
   
}).required()