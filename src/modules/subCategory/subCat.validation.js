import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'

export const getSubCategorySchema=joi.object({
    subCategoeryId:generalFields.id.required()
}).required()

export const createSubCategorySchema=joi.object({
    name:joi.string().max(30).min(3).trim().required(),
    file: generalFields.file.required(),
    categoryId:generalFields.id.required()
}).required()

export const updateSubCategorySchema=joi.object({
    subCategoryId:generalFields.id.required(),
    name:joi.string().max(30).min(3).trim().required(),
    file:generalFields.file.required()
}).required()