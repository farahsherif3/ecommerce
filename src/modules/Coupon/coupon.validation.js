import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'



export const createCouponSchema=joi.object({
    name:joi.string().trim().required(),
    file:generalFields.file,
    amount:joi.number().required(),
    usedBy:generalFields.id
   
}).required()
export const getOneSchema=joi.object({
    couponId:generalFields.id
}).required()



export const updateCouponSchema=joi.object({
    couponId:generalFields.id.required(),
    name:joi.string().max(30).min(3).trim(),
    file:generalFields.file,
    amount:joi.number()

}).required()