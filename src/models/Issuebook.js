const  mongoose=require('mongoose');
const issueBookSchema={
    bookId:{
        type:String,
        required:true,
    },
    bookName:{
        type:String,
        required:true,
    },
    studentId:{
        type:String,
        required:true,
    },
    studentName:{
        type:String,
        required:true,
    },
    issueDate:{
        type:String,
        default:Date.now,
    },
    returnDate:{
        type:String,
        default:Date.now,
    },
    status:{
        type:String,
        enum:["Issued","Returned"],
        default:"Issued",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
};

const Issuebook=new mongoose.model("Issuebook",issueBookSchema);
module.exports=Issuebook;
