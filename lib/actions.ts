"use server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProductSchema } from "./validations/product";
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

export type UserNameFormData = {
  name: string;
};

export async function updateUserName(userId: string, data: UserNameFormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    })

    revalidatePath('/dashboard/settings');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}

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