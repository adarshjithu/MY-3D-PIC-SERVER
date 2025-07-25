import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
},{timestamps:true})


export default mongoose.model("Product",productSchema);
