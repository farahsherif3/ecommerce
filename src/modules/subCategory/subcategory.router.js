import {Router} from 'express'
import { createSubCategory,getAllById,getSubCategory, updateSubCategory } from './subcat.controller/subcate.controller.js'
import { uploadFile,fileValidation } from '../../utils/cluadnairyMulter.js'
import  {asyncHandler} from '../../utils/errorHandler.js'
import {  createSubCategorySchema, getSubCategorySchema, updateSubCategorySchema } from './subCat.validation.js'
import validation from '../../middleware/validation.js'
const router = Router({mergeParams:true})
router.
post('/',uploadFile({customValidation:fileValidation.image}).single('image'),validation(createSubCategorySchema),asyncHandler(createSubCategory))
.get('/gatall',asyncHandler(getAllById))
.get('/:subCategoryId',validation(getSubCategorySchema),asyncHandler(getSubCategory))
.put('/:subCategoryId',uploadFile({customValidation:fileValidation.image}).single('image'),validation(updateSubCategorySchema),asyncHandler(updateSubCategory))



//app.use(globalError)
export default router