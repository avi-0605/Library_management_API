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

    role: {
        type: String,
        required: true,
        enum: ["Librarian", "Student"],
        default: "Student"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
};

const User = mongoose.model("User", userschema);
module.exports = User;

