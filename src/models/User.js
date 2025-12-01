const mongoose=require('mongoose');
const userschema={
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

    role:{type:String,
        reuired:true,
        enum:["Librarian","Students"],
        default:"Student"
    },
    
    createdAt:{
        type:String,
        default:DataTransfer,now 
        }
};

const User=new mongoose.model("User",userschema);
module.export=User;

