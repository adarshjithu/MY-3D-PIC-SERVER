"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const priceSchema = new mongoose_1.default.Schema({
    basePrice: { type: Number, required: true },
    actualPrice: { type: Number },
}, { _id: false });
const inventorySchema = new mongoose_1.default.Schema({
    quantity: { type: Number, default: 0 },
    sku: { type: String },
    lowStockThreshold: { type: Number, default: 5 },
    allowBackorder: { type: Boolean, default: false },
    isTrackable: { type: Boolean, default: true },
}, { _id: false });
const seoSchema = new mongoose_1.default.Schema({
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [{ type: String }],
}, { _id: false });
const baseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: priceSchema,
    thumbnail: { type: String, required: true },
    images: { type: Array, default: [] },
    inventory: inventorySchema,
    seo: seoSchema,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, defaut: false },
    size: { type: Object }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Base", baseSchema);
