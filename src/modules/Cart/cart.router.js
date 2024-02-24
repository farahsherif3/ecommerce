import { Router } from "express";
import * as cartController from './controller/cart.controller.js'
import validation from "../../middleware/validation.js";
import * as cartValidation from './cart.validation.js'
const router=Router()

router
.post('/',validation(cartValidation.addToCartSchema),cartController.addToCart)
.put('/deletFromCart/:productId',validation(cartValidation.deleteFromCartSchema),cartController.deleteFromCart)
.patch('/cleareProduct/:productId',validation(cartValidation.clearProdauctsFromCartSchema),cartController.clearProdauctsFromCart)
export default router