"use server";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { getServerSession } from "next-auth";
import { CreateProductSchema, DeleteProductsSchema } from "./validations/product";

export type UserNameFormData = {
  name: string;
};

export type CreateProductFormData = {
  images: string[];
  name: string;
  description: string;
  tags: string;
  price: number;
  quantity: number;
};

export type DeleteProductsFormData = {
  ids: string[];
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

export async function createProduct(userId: string, data: CreateProductFormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name, description, price, quantity, images, tags } = CreateProductSchema.parse(data);

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

export async function getProducts(userId: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const products = await prisma.product.findMany({
      where: {
        userId: userId
      }
    })

    return { status: "success", products };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}

export async function deleteProducts(userId: string, data: DeleteProductsFormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { ids } = DeleteProductsSchema.parse(data);
    
    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    revalidatePath('/dashboard/inventory');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}