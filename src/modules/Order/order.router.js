import express,{ Router } from "express";
import * as orderController from './controller/order.controller.js'
import auth from "../../middleware/auth.js";
import orderEndPointes from "./orDer.endPoint.js";


const router=Router()
 router
 .post('/',auth(),orderController.createOrder)
 .patch('/cancel/:orderId',auth(orderEndPointes.cancel),orderController.cancelOrder)
 .patch('/deliver/:orderId',auth(orderEndPointes.delvire),orderController.deliverOrder)
 .patch('/rejact/:orderId',auth(orderEndPointes.cancel),orderController.rejectedOrder)
.post('/webhook', express.raw({type: 'application/json'}),orderController.webHook)

