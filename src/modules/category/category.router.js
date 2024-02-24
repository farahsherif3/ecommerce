import {Router} from 'express'
import { createCategory,getAll,getOne,updateCategory } from './category.controller/category.controller.js'
import { uploadFile,fileValidation } from '../../utils/cluadnairyMulter.js'
import  {asyncHandler,globalError} from '../../utils/errorHandler.js'
import auth from '../../middleware/auth.js'
//import subCategoryRouter from '../subCategory/subcategory.router.js'
const router = Router()
router.
post('/'/*,auth()*/,uploadFile({customValidation:fileValidation.image}).single('image'),asyncHandler(createCategory))
.get('/gatall',asyncHandler(getAll))
.get('/:categoryId',asyncHandler(getOne))
.put('/:categoryId',uploadFile({customValidation:fileValidation.image}).single('image'),asyncHandler(updateCategory))
//.use('/:categoryId/subCategory',subCategoryRouter)




export default router