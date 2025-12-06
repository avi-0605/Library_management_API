const User=require('../models/User');
const bcrypt=require(bcrypt);
const jwt=require("jsonwebtoken");

register=async (request,response)=>{
    try{
        const{name,username,email,password}=request.body;
        const existingUser= await User.findOne({username:username});
        if(existingUser){
            return response.status(400).json({message:"Username already exists"});
        }
        const existungEmail= await User.findOne({email:email});
        if(existungEmail){
            return response.status(400).json({message:"Email already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser={
            name,
            username,
            email,
            password:hashedPassword,
            role:"STUDENT"
        };
        const user=new User(newUser);
        await user.save();
        response.status(201).json({message:"User registered successfully",data:user});
    }
  catch(error){
    console.error("REGISTER USER ERROR:",error);
    response.status(500).json({message:error.message});
    }

    login=async(request,response)=>{
        try{
            const{username,password}=request.body;
            const user=await User.findOne({username:username});
            if(!user){
                return response.status(400).json({message:"Invalid username or password"});
            }
            const isMatch=awaitbcrypt.compare(password,user.password);
            if(!isMatch){
                return response.status(401).json({message:"Invalid credentials"});
            }
            const token=jwt.sign(
                {userId:user._id,name:user.name,username:user.username,email:user.email,role:user.role},
                process.env.JWT_SECRET,
                {expiresIn:"1h"});
            response.status(200).json({message:"User logged in Successfully" ,data:{token}});
        }catch(error){
            response.status(500).json({message:"internal server error"})
        }

}
    };
    profile=(request,resposnse)=>{
        try{
            const user=request.user;
            response.status(200).json({message:"User profile",data:user});

        }
        catch(error){

        }
    }
