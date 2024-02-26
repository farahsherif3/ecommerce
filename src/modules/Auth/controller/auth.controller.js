
import UserModel from "../../../../DB/models/User.model.js";
import { GenerateToken, varifyToken } from "../../../utils/Generate_Varify.js";
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandler.js";
import { Hash } from "../../../utils/Hash_Compare.js";
import { config } from "dotenv";
import { Error } from "mongoose";
import {OAuth2Client} from'google-auth-library';
import { nanoid } from "nanoid";
config()

export const signUP=asyncHandler(
    async(req,res,next)=>{
        const {email}=req.body
        const isExisit=await UserModel.findOne({email})
        if(isExisit){
            return next (new Error('email already exisit',{cause:409}))
        }


        const token=GenerateToken=({
            payload:{email},
            signature:process.env.TOKEN_SEGNATURE,
            expires:60*30
        }
        )
       

        const ref_Token=GenerateToken=({payload:{email},
            signature:process.env.SIGNUP_SEGNATURE,
            expires:60*60*24*30
        }
        )

  const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
  const ref_Link=`${req.protocol}://${req.headers.host}/auth/refreshToken/${ref_Token}`

  const html=`
  <a href=${link}>confirm Email</a>
  <br><br>
  <a href=${ref_Link}>refresh email</a>
  `
if(!sendEmail({to:email,subject:'confirmEmail',html})){
    return next (new Error('invalid email',{cause:404}))
}
req.body.password=Hash({plaintext:req.body.password})
const newUser=await UserModel.create(req.body)
return res.status(201).json({message:'done',newUser})
    }
)
export const confirmEmail=asyncHandler(
    async(req,res,next)=>{
        const{token}=req.params
        const{email}=varifyToken({token,signature:process.env.TOKEN_SEGNATURE})
        if(!email){
            return res.redirect('https://www.linkedin.com/login/ar')//signUp
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.redirect('https://www.linkedin.com/login/ar')//signUP
        }
        await UserModel.updateOne({email},{confirmEmail:true})
        return res.redirect('https://www.facebook.com/?locale=ar_AR')//logIn

    }
)


export const refreshToken=asyncHandler(
    async(req,res,next)=>{
        const {token}=req.params
        const {email}=varifyToken({token,signature:process.env.TOKEN_SEGNATURE})
        if(!email){
         return res.redirect('https://www.linkedin.com/login/ar')
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.redirect('https://www.linkedin.com/login/ar')//signUP

        }
        if(user.confirmEmail){
            return res.redirect('https://www.facebook.com/?locale=ar_AR')//logIN
        }
        const newToken=GenerateToken({
            payload:{email,id:emailExist._id},
            signature:process.env.TOKEN_SEGNATURE,
            expiresIn:60*10
        })
        const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
        const html=`
        <a href=${link}>confirmEmail</a>
        `
        if(!sendEmail({to:email,subject:'confirmEmail',html})){
            return next (new Error('invalid email',{cause:404}))
        }
        return res.send('<h1>check your email')
    }
)


export const logIn=asyncHandler(
    async(req,res,next)=>{
        const{email,password}=req.body
        const emailExist=await UserModel.findOne({email})
        if(!emailExist){
            return next(new Error('invalid email or password',{cause:400}))
        }
        if(!emailExist.confirmEmail){
            return next(new Error('please confirm email first',{cause:400}))
        }
        if(!compare({plaintext:password,hashValue:emailExist.password})){
            return next(new Error('invalid email or password',{cause:400}))
        }

        const token=GenerateToken=({
            payload:{email,id:emailExist._id},
            signature:process.env.TOKEN_SEGNATURE,
            expires:60*30
        }
        )
       

        const ref_Token=GenerateToken=({
            payload:{email,id:emailExist._id},
            signature:process.env.TOKEN_SEGNATURE,
            expires:60*60*24*30
    }
        )
        await UserModel.updateOne({email},{
            status:'online',
            isDeleted:false})
            return res.json({message:'done',token,ref_Token})
        }
)
export const updatePassword = asyncHandler(
    async (req, res, next) => {
        const { newPassword } = req.body
       
        const user=await UserModel.findById({_id:req.user._id})
          if (!user) {
            return next(new Error("User not found", { cause: 404 }));
          }
       if(newPassword==user.password){
        return next(new Error('the same passwords'))
       }
       await UserModel.findByIdAndUpdate({_id:req.user._id},{password:newPassword},{new:true})
          return res.json({ message: "Password reset successfully" ,user});
        }
    )
    
    
export const forgetPassword =asyncHandler( 
    async (req, res, next) => {
        const { email } = req.body
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(new Error("User not found", { cause: 404 }));
        }
            const token=GenerateToken({
                payload:{ _id: user._id, email: user.email },
                signature:process.env.TOKEN_SEGNATURE,
                expiresIn:60*30
            })
        const link = `${req.protocol}://${req.headers.host}/resetPassword/${token}`
        
        sendEmail({
            to: email,
            subject: 'Reset Password',
            html: `Hi ${user.userName} \n 
            Please click on the following link <a href='${link}'>Reset</a> to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n,`
        });
        return res.json({ message: "Reset password link sent to email" });
      }
    )
      
export const resetPassword = asyncHandler(
      async (req, res, next) => {
        const {token}=req.params
        const { newPassword } = req.body
          const decodedToken=varifyToken({
            token,
            signature:process.env.TOKEN_SEGNATURE
        })
        
          const user = await UserModel.findOneAndUpdate(
            { _id: decodedToken.id },
           { password: newPassword  },
            { new: true }
          );
      
          if (!user) {
            return next(new Error("User not found", { cause: 404 }));
          }
      
          return res.json({ message: "Password reset successfully" });
       
        
      })

export const logInWithGmail=asyncHandler(
    async(req,res,next)=>{
     
const client = new OAuth2Client();
async function verify() {
    const {idToken}=req.body
  const ticket = await client.verifyIdToken({
     
      idToken ,
      audience: process.env.CLIENT_ID, 
  });
  const payload = ticket.getPayload();
  return payload;
}

const {email,name,picture,email_verified}=await verify()
const user=await UserModel.findOne({email})
//signUp
if(!user){
const newUser=await UserModel.create({
    userName:name,
    email,
    confirmEmail:email_verified,
    password:nanoid(6),
    image:{
        secure_url:picture
    },
    status:"Online",
    provider:"Google"
    
})
const token=GenerateToken=({
    payload:{email,id:newUser._id,role:newUser.role},
    signature:process.env.TOKEN_SEGNATURE,
    expires:60*30
}
)

const ref_Token=GenerateToken=({
    payload:{email,id:newUser._id,role:newUser.role},
    signature:process.env.TOKEN_SEGNATURE,
    expires:60*60*24*30
})
return res .status(201).json({message:'done',ref_Token,token})
}


if(user.provider=="Google"){
user.status="Online"
await user.save()

const token=GenerateToken=({
    payload:{email,id:emailExist._id,role:emailExist.role},
    signature:process.env.TOKEN_SEGNATURE,
    expires:60*30
}
)


const ref_Token=GenerateToken=({
    payload:{email,id:emailExist._id,role:emailExist.role},
    signature:process.env.TOKEN_SEGNATURE,
    expires:60*60*24*30
})
return res .status(200).json({message:'done',ref_Token,token})
}
return next( new Error("invalid provider system login with gmail"));
return res.json({message:'done'})
    }
)