"use server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProductSchema } from "./validations/product";

export type UserNameFormData = {
  name: string;
};

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
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

export async function createProduct(userId: string, data: ProductFormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name, description, price, image } = ProductSchema.parse(data);

    // Update the user name.
    await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        image: image,
        userId: userId
      },
    })

    revalidatePath('/dashboard/products');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}