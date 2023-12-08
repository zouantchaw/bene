'use client'
import { useCallback, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRef, useState } from 'react';
import { Dropzone } from "@/components/shared/dropzone";

import { cn } from "@/lib/utils"
import { ProductSchema } from "@/lib/validations/product"
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
import { Button } from '@/components/ui/button';

import { createProduct, type FormData } from "@/actions/create-product"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { TextArea } from "@/components/ui/textarea";


// TODO: Reusable form component.
// TODO: Reusable Tooltip(Icons.help) component.
// TODO: Reusable Dropzone component.


export function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const [logo, setLogo] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      rentalPrice: 0,
      rentalDuration: "",
      productDescription: "",
      productImages: [],
    },
  })

  const onSubmit = handleSubmit(data => {
    // startTransition(async () => {
    //   const { status } = await createBrand(data);

    //   if (status !== "success") {
    //     toast({
    //       title: "Something went wrong.",
    //       description: "The brand was not created. Please try again.",
    //       variant: "destructive",
    //     })
    //   } else {
    //     toast({
    //       description: "The brand has been created.",
    //     })
    //   }
    // });

  });

  return (
    <form className="grid gap-6" onSubmit={onSubmit}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="productImages">
              Product Images
            </Label>
            <Dropzone
              onChange={setProductImages}
              className="w-full"
              fileExtension="png"
              maxFiles={3}
            />
            {errors?.productImages && (
              <p className="px-1 text-xs text-red-600">
                {errors.productImages.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="productName">
              Product Name
            </Label>
            <Input
              id="productName"
              placeholder="Product Name"
              type="text"
              autoCapitalize="none"
              autoComplete="productName"
              autoCorrect="off"
              {...register("productName")}
            />
            {errors?.productName && (
              <p className="px-1 text-xs text-red-600">
                {errors.productName.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="rentalPrice">
              Rental Price
            </Label>
            <Input
              id="rentalPrice"
              placeholder="Rental Price"
              type="number"
              autoCapitalize="none"
              autoComplete="rentalPrice"
              autoCorrect="off"
              {...register("rentalPrice")}
            />
            {errors?.rentalPrice && (
              <p className="px-1 text-xs text-red-600">
                {errors.rentalPrice.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="rentalDuration">
              Rental Duration
            </Label>
            <Input
              id="rentalDuration"
              placeholder="Rental Duration"
              type="text"
              autoCapitalize="none"
              autoComplete="rentalDuration"
              autoCorrect="off"
              {...register("rentalDuration")}
            />
            {errors?.rentalDuration && (
              <p className="px-1 text-xs text-red-600">
                {errors.rentalDuration.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="productDescription">
              Product Description
            </Label>
            <TextArea
              id="productDescription"
              placeholder="Product Description"
              autoCapitalize="none"
              autoComplete="productDescription"
              autoCorrect="off"
              {...register("productDescription")}
            />
            {errors?.productDescription && (
              <p className="px-1 text-xs text-red
              -600">
                {errors.productDescription.message}
              </p>
            )}
          </div>
        </div>
        <button className={cn(buttonVariants())} disabled={!isDirty}>
          {isPending && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create Product
        </button>
      </div>
    </form>
  )
}
