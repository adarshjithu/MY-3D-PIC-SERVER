
import { z } from "zod";

export const baseProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),

  basePrice: z.preprocess((val) => Number(val), z.number().positive("Base price must be a positive number")),
  actualPrice: z.preprocess((val) => Number(val), z.number().positive("Actual price must be a positive number")),

  quantity: z.preprocess((val) => Number(val), z.number().int().nonnegative("Quantity must be a non-negative integer")),

  sku: z.string().optional(),

  lowStockThreshold: z.preprocess((val) => Number(val), z.number().int().nonnegative("Low stock threshold must be a number")),

  allowBackorder: z.preprocess((val) => val === 'true', z.boolean()),
  isTrackable: z.preprocess((val) => val === 'true', z.boolean()),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  metaKeywords: z.preprocess(
    (val) => typeof val === 'string' ? val.split(',').map(k => k.trim()) : [],
    z.array(z.string())
  ),

  isActive: z.preprocess((val) => val === 'true', z.boolean()),
});
