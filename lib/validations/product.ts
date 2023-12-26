import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name." }).max(255),
  description: z.string().min(10, { message: "Please enter a valid description." }).max(255),
  price: z.coerce.number().gte(0, { message: "Please enter a valid price." }),  
  tags: z.string().min(1, { message: "Please enter at least one tag." }).max(255),
  images: z.any(),
  quantity: z.string(),
});