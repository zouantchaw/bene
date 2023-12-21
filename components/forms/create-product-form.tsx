"use client"

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "@prisma/client"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { ProductSchema } from "@/lib/validations/product";
import { buttonVariants } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"

import { createProduct, type ProductFormData } from "@/lib//actions"

interface ProductFormProps {
  product: Pick<Product, "userId" | "name" | "description" | "price" | "tags" | "images" | "quantity">
}

export function CreateProductForm() {
  return (
    <div>hey</div>
  )
}