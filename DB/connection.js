import mongoose from 'mongoose';
  const connection=async()=>{
 return await mongoose.connect("mongodb+srv://farah:X71hIriVf2LctZ17@cluster0.2f5tqoq.mongodb.net/Ecommerce")
 .then(()=>{
    console.log("db connected")
 }).catch((err)=>{

    console.log(err)
 })
 }
export default connection