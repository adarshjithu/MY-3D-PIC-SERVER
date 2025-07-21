import { z } from "zod";

export const addressValidationSchema = z.object({
  userId:z.string().optional(),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  company: z.string().trim().optional(),
  street: z.string().trim().min(1, "Street is required"),
  apartment: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required"),
  zip: z.string().trim().min(1, "Zip code is required"),
  province: z.string().trim().min(1, "Province is required"),
  country: z.string().trim().min(1, "Country is required"),
  phone: z.string().trim().optional(),
  type: z.string().min(1, "Type is required"), // You can use `.refine()` for specific types if needed
  isDefault: z.boolean().optional(),
});
