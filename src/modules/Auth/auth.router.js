import { Router } from "express";
import validation from '../../middleware/validation.js'
import * as authController from './controller/auth.controller.js'
import * as authValidation from './auth.validation.js'

const router=Router()

router.
post('/signUp',validation(authValidation.signUPSchema),authController.signUP)
.post('/logIn',validation(authValidation.logInSchema),authController.logIn)
.get('/confirmEmail/:token',validation(authValidation.tokenSchema),authController.confirmEmail)
.get('/refreshToken/:token',validation(authValidation.tokenSchema),authController.refreshToken)
.patch('./updatePassword',validation(authValidation.updatepasswordSchema),authController.updatePassword)
.get('./forgetpassword',validation(authValidation.forgotPasswordSchema),authController.forgetPassword)
.put('./resetPassword',validation(authValidation.resetPasswordSchema),authController.resetPassword)

export default router