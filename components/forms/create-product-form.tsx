'use client'
import * as React from "react";
import { useState } from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "@prisma/client"
import { useForm } from "react-hook-form"
import { X } from "lucide-react";

import { cn } from "@/lib/utils"
import { ProductSchema } from "@/lib/validations/product";
import { buttonVariants } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"

import { createProduct, type ProductFormData } from "@/lib//actions"
import { ProductPreview } from "@/components/dashboard/inventory/product-preview";

export function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = handleSubmit(data => {
    startTransition(async () => {
      const result = await createProduct("user.id", data);

      if (result.status !== "success") {
        toast({
          title: "Something went wrong.",
          description: "Your product was not created. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          description: "Your product has been created.",
        });
      }
    });
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 3) {
        toast({
          title: "Too many files",
          description: "You can only upload up to 3 images.",
          variant: "destructive",
        });
        return;
      }

      for (let i = 0; i < e.target.files.length; i++) {
        if (!['image/png', 'image/jpeg'].includes(e.target.files[i].type)) {
          toast({
            title: "Invalid file type",
            description: "Only PNG and JPEG images are allowed.",
            variant: "destructive",
          });
          return;
        }
      }

      setImages(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start w-full px-4 mx-auto">
      <div className="grid gap-6 md:gap-12 items-start">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden dark:border-gray-800">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="images">Images</Label>
              <Input
                className="border p-2 rounded-md"
                id="images"
                type="file"
                {...register("images")}
                aria-describedby="images-error"
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
              />
              {images.map((image, index) => (
                <div key={index} className="flex items-center justify-between mt-2">
                  <img src={image} alt={`Uploaded ${index}`} className="w-10 h-10 object-cover" />
                  <button type="button" onClick={() => handleImageRemove(index)}>
                    <X size={24} />
                  </button>
                </div>
              ))}
              {errors?.images && (
                <div
                  id="images-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.images.message}</p>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="name">Name</Label>
              <Input
                className="border p-2 rounded-md"
                id="name"
                placeholder="Enter product name"
                {...register("name")}
                aria-describedby="name-error"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors?.name && (
                <div
                  id="name-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.name.message}</p>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="description">Description</Label>
              <Input
                className="border p-2 rounded-md"
                id="description"
                placeholder="Enter product description"
                {...register("description")}
                aria-describedby="description-error"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors?.description && (
                <div
                  id="description-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.description.message}</p>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="tags">Tags</Label>
              <Input
                className="border p-2 rounded-md"
                id="tags"
                placeholder="Enter tags separated by commas"
                {...register("tags")}
                aria-describedby="tags-error"
                value={tags}
                onChange={(e) => setTags(e.target.value.split(','))}
              />
              {errors?.tags && (
                <div
                  id="tags-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.tags.message}</p>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="price">Price</Label>
              <Input
                className="border p-2 rounded-md"
                id="price"
                placeholder="Enter product price"
                type="number"
                {...register("price")}
                aria-describedby="price-error"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              {errors?.price && (
                <div
                  id="price-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.price.message}</p>
                </div>
              )}
            </div>
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="quantity">Quantity</Label>
              <Input
                className="border p-2 rounded-md"
                id="quantity"
                placeholder="Enter product quantity"
                type="number"
                {...register("quantity")}
                aria-describedby="quantity-error"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              {errors?.quantity && (
                <div
                  id="quantity-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  <p>{errors.quantity.message}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>{isPending ? "Creating..." : "Create Product"}</span>
            </button>
          </CardFooter>
        </Card>
      </div>
      <div className="md:col-span-1">
        <ProductPreview
          images={images}
          name={name}
          description={description}
          tags={tags}
          price={price}
          quantity={quantity}
        />
      </div>
    </form>
  );
}
