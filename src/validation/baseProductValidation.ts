import { z } from "zod";

export const baseProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),

    price: z.object({
        basePrice: z.number({ message: "Base price is required" }),
        actualPrice: z.number().optional(),
    }),

    thumbnail: z.string().min(1, "Thumbnail URL is required"),
    images: z.array(z.string()).optional(),

    inventory: z.object({
        quantity: z.number().default(0),
        sku: z.string().optional(),
        lowStockThreshold: z.number().default(5),
        allowBackorder: z.boolean().default(false),
        isTrackable: z.boolean().default(true),
    }),

    seo: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.array(z.string()).optional(),
    }),

 
});
