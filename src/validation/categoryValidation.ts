

import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
