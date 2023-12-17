import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: "Please enter a valid name." }).max(255),
  description: z.string().min(10, { message: "Please enter a valid description." }).max(255),
  price: z.coerce.number().gte(0, { message: "Please enter a valid price." }),  
  tags: z.array(z.string().min(1).max(255)),
  images: z.array(z.object({
    size: z.number().min(1, { message: "Please upload at least one image." }),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
  })),
  quantity: z.string(),
});