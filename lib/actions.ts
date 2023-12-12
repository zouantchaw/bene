"use server";
import { z } from "zod";

const ProductSchema = z.object({
  productName: z.string({
    invalid_type_error: "Product name must be a string.",
  }).min(1).max(255),
  productDescription: z.string({
    invalid_type_error: "Product description must be a string.",
  }).min(1).max(255),
  rentalPrice: z.number({
    invalid_type_error: "Rental price must be a number.",
  }).min(0),
  tags: z.array(z.string({}).min(1).max(255)),
  productImages: z.array(z.string().min(1).max(255)),
  quantity: z.number({
    invalid_type_error: "Quantity must be a number.",
  }).min(0),
});

const CreateProduct = ProductSchema.strict();

export type State = {
  errors?: {
    productName?: string[];
    productDescription?: string[];
    rentalPrice?: string[];
    tags?: string[];
    productImages?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

// Create a product 
export async function createProduct(prevState: State, formData: FormData) {
  console.log("createProduct");
  console.log(formData);
  // Validate the form with Zod
  const validatedFields = CreateProduct.safeParse({
    productName: formData.get("productName"),
    productDescription: formData.get("productDescription"),
    rentalPrice: formData.get("rentalPrice"),
    tags: formData.getAll("tags"),
    productImages: formData.getAll("productImages"),
    quantity: formData.get("quantity"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database

  // Insert data into the database
  try {
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }
}