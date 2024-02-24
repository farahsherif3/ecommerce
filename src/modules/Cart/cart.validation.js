import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'


export  const addToCartSchema=joi.object({
    userId:generalFields.id.required(),
    products:joi.array().items({
        productId:generalFields.id.required(),
        quantity:joi.number().min(1).required()
     }),
     authorization:joi.string().required()
}).required()

export const deleteFromCartSchema=joi.object({
    authorization:joi.string().required(),
    productId:generalFields.id.required()
}).required()

export const clearProdauctsFromCartSchema=joi.object({
    authorization:joi.string().required()
}).required()


