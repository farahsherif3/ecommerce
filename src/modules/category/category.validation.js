import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'



export const getOneSchema=joi.object({
    categoryId:generalFields.id
}).required()

export const createCategorySchema=joi.object({
    name:joi.string().max(30).min(3).trim().required(),
    file:generalFields.file.required()
}).required()

export const updateCategorySchema=joi.object({
    categoryId:generalFields.id.required(),
    name:joi.string().max(30).min(3).trim().required(),
    file:generalFields.file.required()
}).required()