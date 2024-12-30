import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import 'dotenv/config'
import jwt from "jsonwebtoken"


export const register = async (req,res)=>{
   const {username, email , password} = req.body;

   //hash the password
   try{
   const  hashedPassword =  await bcrypt.hash(password,10);
   
   // create new user 

   const newUser = await  prisma.user.create({
    data : {
        username,
        email,
        password : hashedPassword,
    },
   })
   console.log(newUser)
   res.status(201).json({message : "User created successfully "})
}catch(err){
    console.log(err);
    res.status(500).json({message : "failed to create user"})
}

}

export const login = async (req,res)=>{
    const {username , password} = req.body;

    try{
    //check if the user exists

    const user = await  prisma.user.findUnique({
        where :{username}
    })

    if(!user) return res.status(404).json({message : "user not found"})




    // check if the password is correct

    const isPasswordValid = await bcrypt.compare(password , user.password)
    if(!isPasswordValid) return res.status(404).json({message : "wrong password"})

    // generate cookie token

//res.setHeader("set-cookie" , "test=" + "myValue").json("success")
const age = 1000*60 *60 *24*7
  const token = jwt.sign({
    id : user.id,
    isAdmin : false,
  } , process.env.JWT_SECRET_KEY ,
 {
    expiresIn : age
 })

 const {password : userPassword , ...userInfo }= user

res.cookie("token" , token ,{
    httpOnly :true,
    maxAge :age

}).status(200).json(userInfo)
    }catch(err){
        console.log(err);
        res.status(500).json({message: "failed to login"})
    }

    
}

export const logout = (req,res)=>{

   res.clearCookie("token").status(200).json({message : "logout successful"})
    
}