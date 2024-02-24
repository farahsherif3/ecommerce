import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'



export const getOneBrandSchema=joi.object({
    brandId:generalFields.id
}).required()

export const createBrandSchema=joi.object({
    name:joi.string().max(30).min(3).trim().required(),
    file:generalFields.file.required()
}).required()

export const updateBrandSchema=joi.object({
    brandId:generalFields.id.required(),
    name:joi.string().max(30).min(3).trim().required(),
    file:generalFields.file.required()
}).required()