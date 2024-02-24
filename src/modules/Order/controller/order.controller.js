import Stripe from "stripe";
import cartModel from "../../../../DB/models/Cart.model.js";
import CouponModel from "../../../../DB/models/Coupon.model.js";
import OrderModel from "../../../../DB/models/Order.model.js";
import productModel from "../../../../DB/models/product.model.js";
import createInvoice from '../../../utils/createInvoice.js'
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandler.js";
import payment from "../../../utils/payment.js";


export const createOrder=asyncHandler(
    async(req,res,next)=>{
        const{products,couponName}=req.body
        const{_id}=req.user
        const cart=await cartModel.findOne({userId:_id})
        if(!cart.products?.length){
            return next(new Error('cart is not exist',{cause:404}))
        }
        let coupon={amount:0}
        if(couponName){
            coupon=await CouponModel.findOne({name:couponName, usedBy:{ $nin:_id }})
        if(!coupon){
            return next(new Error('invalid coupon',{cause:404}))
        }
        if(coupon.expireIn.getTime()<new Date().getTime()){
            return next(new Error('expired coupon',{cause:404}))
        }
        }
        if(!products?.length){
            products=cart.products.toObject()
        }
        const allProducts=[]
        let subPrice=0;
        for (const product of products) {
            const productExist=await productModel.findOne({
                _id:product.productId,
                isDeleted:false,
                stock:{$gte:product.quantity}
            })
            if(!productExist){
                return next(new Error('product is not exist',{cause:404}))
            }
           
           product.name=productExist.name
           product.productId=product.productId
           product.quantity=productExist.quantity
           product.unitprice=productExist.finalPrice
           product.totalPrice=productExist.finalPrice * product.quantity
            allProducts.push(product)
            subPrice+=product.totalPrice
        }
        for (const product of products) {
            await cartModel.updateOne({userId:_id},{
                $pull:{
                    products:{
                        productId:{ $in:product.productId }
                    }
                }
            })
            await productModel.updateOne({_id:product.productId},{ $inc :{ stock:-parseInt(product.quantity)}} )
        }





        req.body.products=allProducts
        req.body.subPrice=subPrice
        req.body.finalPrice=subPrice-(subPrice*coupon.amount)/100
        const order=await OrderModel.create(req.body)
       if(couponName){
        await CouponModel.updateOne({_id:coupon._id},{ $push: { usedBy:  _id }})
       }
//createinvoice
const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items: order.products,
    subtotal: subPrice,
    paid: 0,
    invoice_nr: order._id.toString(),
    createdAt:order.createdAt
  };
  
  createInvoice(invoice, "invoice.pdf");


await sendEmail({to:req.user.email,subject:'invoice',attachments:{
    path:'invoice.pdf',
    application:'application/pdf'
}})

if(order.paymentType=='card'){
    let createcoupon
    if(couponName){
        createcoupon=await Stripe.coupons.create({
            amount_off:coupon.amount,
            duration:'once'
        })
    }
    const session=await payment({
        customer_email:req.user.email,
        metadata:{
            orderId:order._id
        },
        success_url:`${process.env.SUCCESS_URL}/${order._id}`,
        cancel_url:`${process.env.CANCEL_URL}/${order._id}`,
        line_items:order.products.map(element=>{
            return{
                price_data:{
                    currency:'USD',
                    product_data:{
                       name:element.name
                    },
                unite_amount:element.unitPrice *100,
                    },
                    quantity:element.quantity
            }
            
        }),
        discounts:couponName?[{coupon:createcoupon.id}]:[]
    })
    return res.status(201).json({message:'done',order,session})
}



        return res.status(201).json({message:'done',order})
    }
)


export const cancelOrder=asyncHandler(
    async(req,res,next)=>{
        const{orderId}=req.params
        const order=await OrderModel.findOne({_id:orderId})
        if(!order){
            return next(new Error('invalid orderId',{cause:404}))
        }
        if(order.status!='placed'|| order.status!='waitForPayment'){
            return next(new Error('inavalid canceld order',{cause:400}))
        }
        for (const product of order.products) {
            await productModel.updateOne({_id:product.productId},{ $inc :{ stock:parseInt(product.quantity)}} )

        }
        
        if(order.couponId){
            await CouponModel.updateOne({_id:coupon._id},{ $pull: { usedBy:  req.user._id }})
        }
        
        const updatedOrder=await OrderModel.updateOne({_id:orderId},{status:'canceled',updatedBy:req.user._id})
 return res.status(200).json({message:'done',updatedOrder})

    }
)

export const deliverOrder=asyncHandler(
    async(req,res,next)=>{
        const{orderId}=req.params
        const order=await OrderModel.findOne({_id:orderId})
        if(!order){
            return next(new Error('invalid orderId',{cause:404}))
        }
        if(order.status!='onWay'){
            return next(new Error('inavalid canceld order',{cause:400}))
        }
        const updatedOrder=await OrderModel.updateOne({_id:orderId},{status:'delvired',updatedBy:req.user._id})
 return res.status(200).json({message:'done',updatedOrder})

    }
)

/// rejected end point