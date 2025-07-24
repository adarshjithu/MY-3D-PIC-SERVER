import mongoose from "mongoose";
import { IBaseProduct } from "../types/IBase";

const priceSchema = new mongoose.Schema(
    {
        basePrice: { type: Number, required: true },
        actualPrice: { type: Number },
    },
    { _id: false }
);

const inventorySchema = new mongoose.Schema(
    {
        quantity: { type: Number, default: 0 },
        sku: { type: String },
        lowStockThreshold: { type: Number, default: 5 },
        allowBackorder: { type: Boolean, default: false },
        isTrackable: { type: Boolean, default: true },
    },
    { _id: false }
);

const seoSchema = new mongoose.Schema(
    {
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: [{ type: String }],
    },
    { _id: false }
);

const baseSchema = new mongoose.Schema<IBaseProduct>({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: priceSchema,
    thumbnail: { type: String, required: true },
    images: { type: Array, default: [] },
    inventory: inventorySchema,
    seo: seoSchema,
    isActive:{type:Boolean,default:true},
    isDeleted:{type:Boolean,defaut:false},
    size:{type:Object}
},{timestamps:true});


export default mongoose.model<IBaseProduct>("Base",baseSchema);
