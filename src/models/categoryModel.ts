import mongoose from "mongoose";
import { ICategory } from "../types/ICategory";

const categorySchema = new mongoose.Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String ,default:""},

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
