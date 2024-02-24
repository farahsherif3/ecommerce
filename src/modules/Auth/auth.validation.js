import joi from 'joi'
import { generalFields } from '../../utils/generalFeildes.js'



export const signUPSchema=joi.object({
    userName:joi.string().min(2).max(20).required(),
    email:generalFields.email.required(),
    password:generalFields.password.required(),
    file:generalFields.file.required(),
    phone:joi.string(),
    age:joi.string(),

}).required()

export const logInSchema=joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()
}).required()


export const tokenSchema=joi.object({
    token:joi.string().required(),
}).required()


export const updatepasswordSchema=joi.object({
    authorization:joi.string().required(),
    newPassword:generalFields.password.required()
}).required()



export const forgotPasswordSchema=joi.object({
    email:generalFields.email.required()
}).required()

export const resetPasswordSchema=joi.object({
    token:joi.string().required(),
    newPassword:generalFields.password.required()
}).required()

