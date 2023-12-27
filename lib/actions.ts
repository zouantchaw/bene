"use server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProductSchema } from "./validations/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type UserNameFormData = {
  name: string;
};

export type ProductFormData = {
  images: string[];
  name: string;
  description: string;
  tags: string;
  price: number;
  quantity: number;
};

export async function updateUserName(userId: string, data: UserNameFormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

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

    const { name, description, price, quantity, images, tags } = ProductSchema.parse(data);

    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        tags: JSON.parse(tags),
        price: price, 
        quantity: parseInt(quantity),
        images: images,
        userId: userId,
      }
    })

    revalidatePath('/dashboard/inventory');
    return { status: "success", product: product };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}