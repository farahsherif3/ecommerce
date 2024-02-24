import express from "express"
import { config } from "dotenv"
import bootstrab from "./src/bootstrap.js"
import cors from 'cors'
const app=express()
const port=3000

bootstrab(app,express)
console.log(process.env.URI)
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 if(process.env.MOOD=='DEV'){
    app.use(cors())
 }else{
    app.use(
        async(req,res,next)=>{
        if(!whitelist.includes(req.header('origin'))){
            return next(new Error('not allowed by cors',{cause:502}))
        }
        await res.header('Access-Control-Allow-Origin','*')
        await res.header('Access-Control-Allow-Header','*')
        await res.header('Access-Control-Allow-Private-Network','true')
        await res.header('Access-Control-Allow-Method','*')
next()
    })
 }


app.listen(port,()=>{
console.log("server running")
})