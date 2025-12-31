const mongoose =require("mongoose");
const articlescehema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        sourceurl:{
            type:String,
            required:true
        },
        isUpdated:{
            type:Boolean,
            default:false
        },
        references:{
            type:[String]
        }
    },{timestamps:true

    }
);
module.exports=mongoose.model("Article",articlescehema);