import connection from "../DB/connection.js"
import categoryRouter from'../src/modules/category/category.router.js'
import subCategoryRouter from '../src/modules/subCategory/subcategory.router.js'
import authRouter from '../src/modules/Auth/auth.router.js'
import couponRouter from '../src/modules/Coupon/coupon.router.js'
import productRouter from '../src/modules/Product/product.router.js'
import cartRouter from '../src/modules/Cart/cart.router.js'
import { globalError } from "./utils/errorHandler.js"
const bootstrab=(app,express)=>{
 app.use(express.json())
 app.use('/category',categoryRouter)
 app.use('/subCategory',subCategoryRouter)
 app.use('/auth',authRouter)
 app.use('/coupon',couponRouter)
 app.use('/product',productRouter)
 app.use('/cart',cartRouter)
 app.use(globalError)
connection()
}
export default bootstrab