const mongoose=require('mongoose');
const bookSchema={
    title:{
        type:String,
        required:true,
    },

    author:{
        type:String,
        required:true,
    },

    quantity:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["Available","Not Available"],
        default:"Available"
    },
    createdAt:{
        type:String,
        default:Date.now
    }
};
const Book=new mongoose.model("Book",bookSchema);
module.export=Book;
