import { z } from 'zod';

// Example schema for a rental product
export const ProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  rentalPrice: z.number().min(0, 'Rental price must be a positive number'),
  rentalDuration: z.string().min(1, 'Rental duration is required'),
  productDescription: z.string().optional(),
  productImages: z.array(z.string()).max(3, 'You can upload a maximum of 3 images'),
});
