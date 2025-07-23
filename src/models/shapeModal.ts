import mongoose from "mongoose";
import { IShape } from "../types/IShape";

const shapeSchema = new mongoose.Schema<IShape>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        isActive:{type:Boolean,default:true},
    },
    { timestamps: true }
);


export default mongoose.model<IShape>("Shape",shapeSchema);
