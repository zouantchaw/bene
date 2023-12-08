'use client'
import { useCallback, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRef, useState } from 'react';

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

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: string;
  maxFileSizeKB?: number;
  maxFiles?: number;
}

const closeIcon = (
  <Icons.close className="h-4 w-4 text-gray-400 hover:text-gray-500" />
)


function Dropzone({ onChange, className, fileExtension, maxFileSizeKB = 1024, maxFiles = 3 }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File) => {
    // Validate file extension
    if (fileExtension && !file.name.endsWith(`.${fileExtension}`)) {
      return `Invalid file type. Expected: .${fileExtension}`;
    }
    // Validate file size
    if (maxFileSizeKB && file.size > maxFileSizeKB * 1024) {
      return `File is too large. Maximum size is ${maxFileSizeKB} KB.`;
    }
    return null;
  }, [fileExtension, maxFileSizeKB]);

  const handleFiles = useCallback((files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Maximum of ${maxFiles} files can be uploaded.`);
      return;
    }
    const newFiles = Array.from(files).map(file => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return null;
      }
      return URL.createObjectURL(file);
    }).filter(Boolean) as string[];
    setUploadedFiles(prev => [...prev, ...newFiles]);
    onChange([...uploadedFiles, ...newFiles]);
    setError(null);
  }, [validateFile, onChange, uploadedFiles, maxFiles]);

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Card className={`bg-muted border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer ${className}`}>
        <CardContent
          className="flex flex-col items-center justify-center px-2 py-4 text-xs space-y-2"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Icons.add className="h-8 w-8 text-muted-foreground" />
          <span className="font-medium">Drag Files to Upload or Click Here</span>
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
            multiple={true} // Allow multiple files
          />
        </CardContent>
        {error && <span className="text-red-500">{error}</span>}
      </Card>
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center space-x-2">
          <p>{`Uploaded File ${index + 1}: ${file}`}</p>
          <button onClick={() => removeFile(index)}>
            {closeIcon}
          </button>
        </div>
      ))}
    </div>
  );
}

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
