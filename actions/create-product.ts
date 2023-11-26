"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProductSchema } from "@/lib/validations/product"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type FormData = {
  productName: string;
  rentalPrice: number;
  rentalDuration: string;
  productDescription: string;
  productImages: string[];
};

export async function createProduct(userId: string, data: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { productName } = ProductSchema.parse(data);

    // Create the brand.
    // await prisma.product.create({
    //   data: {
    //     name: name,
    //     subdomain: subdomain,
    //     description: description,
    //     userId: userId,
    //   },
    // })

    revalidatePath('/dashboard/brands');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}