import {Router} from 'express'
import { createBrand,getAllBrand,getOneBrand, updateBrand } from './subcat.controller/brand.controller.js'
import { uploadFile,fileValidation } from '../../utils/cluadnairyMulter.js'
import  {asyncHandler} from '../../utils/errorHandler.js'
import * as brandvalidation from './brand.validation.js'
//const router = Router({mergeParams:true})
const router=Router()
router.
post('/',
uploadFile({customValidation:fileValidation.image}).single('image'),
validation(brandvalidation.createBrandSchema),
asyncHandler(createBrand)
)

.get('/gatall'
,asyncHandler(getAllBrand)
)
.get('/:brandId'
,validation(brandvalidation.getOneBrandSchema),
asyncHandler(getOneBrand)
)
.put('/:brandId',
uploadFile({customValidation:fileValidation.image}).single('image')
,validation(brandvalidation.updateBrandSchema),asyncHandler(updateBrand)
)



//app.use(globalError)
export default router