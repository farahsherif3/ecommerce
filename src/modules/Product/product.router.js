import { Router } from "express";
import {uploadFile,fileValidation}from '../../utils/cluadnairyMulter.js'
import * as productController from './controller/product.controller.js'
import validation from "../../middleware/validation.js";
import * as productValidation from './product.validation.js'
const router=Router()

router
.post("/create",uploadFile(fileValidation.image).fields([
    {name:"mainImage",maxCount:1},
    {name:"subImages",maxCount:5},
]),
validation(productValidation.createProductSchema),
productController.createProduct
)

.put("/update",uploadFile(fileValidation.image).fields([
    {name:"mainImage",maxCount:1},
    {name:"subImages",maxCount:5},
]),
validation(productValidation.updateProductSchema),
productController.updateProduct
)
.get('/allProduct',
productController.allProduct
)
.get('/getOneProduct/:productid',
validation(productValidation.getOneProductSchema),
productController.getOneProduct
)


export default router