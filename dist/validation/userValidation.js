"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    phoneNumber: zod_1.z.string().min(7, { message: "Phone number is required" }).regex(/^\d+$/, "Phone number must be digits only"),
    countryCode: zod_1.z.string().min(1, { message: "Country code is required" }),
});
exports.loginValidation = zod_1.z.object({
    email: zod_1.z
        .string({ message: "Email is required" }),
    password: zod_1.z
        .string({ message: "Password is required" })
});
