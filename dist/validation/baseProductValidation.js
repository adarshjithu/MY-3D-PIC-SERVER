"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseProductSchema = void 0;
const zod_1 = require("zod");
exports.baseProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    slug: zod_1.z.string().min(1, "Slug is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.object({
        basePrice: zod_1.z.number({ message: "Base price is required" }),
        actualPrice: zod_1.z.number().optional(),
    }),
    thumbnail: zod_1.z.string().min(1, "Thumbnail URL is required"),
    images: zod_1.z.array(zod_1.z.string()).optional(),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().default(0),
        sku: zod_1.z.string().optional(),
        lowStockThreshold: zod_1.z.number().default(5),
        allowBackorder: zod_1.z.boolean().default(false),
        isTrackable: zod_1.z.boolean().default(true),
    }),
    seo: zod_1.z.object({
        metaTitle: zod_1.z.string().optional(),
        metaDescription: zod_1.z.string().optional(),
        metaKeywords: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
