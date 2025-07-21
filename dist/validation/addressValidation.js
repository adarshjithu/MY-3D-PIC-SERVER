"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidationSchema = void 0;
const zod_1 = require("zod");
exports.addressValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    firstName: zod_1.z.string().trim().min(1, "First name is required"),
    lastName: zod_1.z.string().trim().min(1, "Last name is required"),
    company: zod_1.z.string().trim().optional(),
    street: zod_1.z.string().trim().min(1, "Street is required"),
    apartment: zod_1.z.string().trim().optional(),
    city: zod_1.z.string().trim().min(1, "City is required"),
    zip: zod_1.z.string().trim().min(1, "Zip code is required"),
    province: zod_1.z.string().trim().min(1, "Province is required"),
    country: zod_1.z.string().trim().min(1, "Country is required"),
    phone: zod_1.z.string().trim().optional(),
    type: zod_1.z.string().min(1, "Type is required"), // You can use `.refine()` for specific types if needed
    isDefault: zod_1.z.boolean().optional(),
});
