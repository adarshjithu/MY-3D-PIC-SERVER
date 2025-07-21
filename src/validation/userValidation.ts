import { email, z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(2, {message:"First name must be at least 2 characters"}),
  lastName: z.string().min(1, {message:"Last name is required"}),
  email: z.string().email({message:"Invalid email address"}),
  password: z
    .string()
    .min(6,{ message:"Password must be at least 6 characters"})
    .regex(/[A-Z]/, {message:"Password must contain at least one uppercase letter"})
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
 
  phoneNumber: z.string().min(7, {message:"Phone number is required"}).regex(/^\d+$/, "Phone number must be digits only"),
  countryCode: z.string().min(1, {message:"Country code is required"}),
})





export const loginValidation = z.object({
  email: z
    .string({ message: "Email is required" })
    ,

  password: z
    .string({ message: "Password is required" })
  
});
