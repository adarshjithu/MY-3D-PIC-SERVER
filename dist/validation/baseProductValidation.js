"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseProductSchema = void 0;
const zod_1 = require("zod");
exports.baseProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    basePrice: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().positive("Base price must be a positive number")),
    actualPrice: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().positive("Actual price must be a positive number")),
    quantity: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().int().nonnegative("Quantity must be a non-negative integer")),
    sku: zod_1.z.string().optional(),
    lowStockThreshold: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().int().nonnegative("Low stock threshold must be a number")),
    allowBackorder: zod_1.z.preprocess((val) => val === 'true', zod_1.z.boolean()),
    isTrackable: zod_1.z.preprocess((val) => val === 'true', zod_1.z.boolean()),
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional(),
    metaKeywords: zod_1.z.preprocess((val) => typeof val === 'string' ? val.split(',').map(k => k.trim()) : [], zod_1.z.array(zod_1.z.string())),
    isActive: zod_1.z.preprocess((val) => val === 'true', zod_1.z.boolean()),
});
