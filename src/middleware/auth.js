import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/User.model.js'
 
const roles={
    Admin:'Admin',
    User:'User'
}
 
const auth=(role=Object.values(roles))=>{
 return async(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return next (new error ('please lolgIN  first',{cause:401}))
    }
    if(!authorization.startWith(process.env.BEARER_TOKEN)){
        return next (new error ('invalid token'))
    }
    const token=authorization.split(process.env.BEARER_TOKEN)[1]
    const payload=jwt.verify(token,'schoola')
    if(!payload._id){
        return next (new error("invalid payload",{cause:404}))
    }
    const user=await userModel.findOne({_id:payload._id})
    if(!user){
        return next (new error("invalid token",{cause:404}))
    }
    if(user.isDeleted==true){
        return next (new error ("user is soft deleted,please log in again"))
    }
if(!role.includes(user.role)){
    return next(new Error('not authorized',{cause:401}))
}
    req.user=user
    next()
}
 }
export default auth