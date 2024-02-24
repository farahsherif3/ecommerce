import {Router} from 'express'
import * as couponController from './coupon.controller/coupon.controller.js'
import { uploadFile,fileValidation } from '../../utils/cluadnairyMulter.js'
import  {asyncHandler,globalError} from '../../utils/errorHandler.js'
import auth from '../../middleware/auth.js'
import * as couponValidation from './coupon.validation.js'

import validation from '../../middleware/validation.js'

const router = Router()
router.
post('/',
//auth()
uploadFile({customValidation:fileValidation.image}).single('image'),
validation(couponValidation.createCouponSchema),
couponController.createCoupon
)

.get('/gatall'
,couponController.getAll
)

.get('/getOne/:couponId'
,validation(couponValidation.getOneSchema)
,couponController.getOne
)

.put('/update/:couponId'
,uploadFile({customValidation:fileValidation.image}).single('image')
,validation(couponValidation.updateCouponSchema)
,couponController.updateCoupon
)

export default router