"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
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

const CreateProduct = ProductSchema.omit({
  id: true,
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    tags?: string[];
    images?: string[];
    quantity?: string[];
  };
  message?: string | null;
};

// Create a product 
export async function createProduct(prevState: State, formData: FormData) {
  console.log("===== Create Product =====");
  console.log(formData.get("name"));
  console.log(formData.get("description"));
  console.log(formData.get("price"));
  console.log(formData.getAll("tags"));
  console.log(formData.getAll("images"));
  console.log(formData.get("quantity"));

  // Validate the form with Zod
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData.getAll("tags"),
    images: formData.getAll("images"),
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
  const { name, description, price, tags, images, quantity } = validatedFields.data;

  // Insert data into the database
  try {
    console.log("creating product");
    console.log(name);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/inventory");
  redirect("/dashboard/inventory");
}