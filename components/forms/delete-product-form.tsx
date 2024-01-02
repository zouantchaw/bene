"use client"

// import * as React from "react"
import { useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { DeleteProductsSchema } from "@/lib/validations/product"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"

import { deleteProducts, type DeleteProductsFormData } from "@/lib//actions"

interface DeleteProductsFormProps {
  user: Pick<User, "id">
  selectedRows: string[]
  disabled?: boolean
}

export function DeleteProductsForm({ user, selectedRows, disabled }: DeleteProductsFormProps) {
  const [isPending, startTransition] = useTransition();
  const deleteProductWithIds = deleteProducts.bind(null, user.id);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<DeleteProductsFormData>({
    resolver: zodResolver(DeleteProductsSchema),
  })

  useEffect(() => {
    setValue("ids", selectedRows);
  }, [selectedRows, setValue])

  const onSubmit = handleSubmit(data => {
    startTransition(async () => {
      const { status } = await deleteProductWithIds(data);
      if (status !== "success") {
        toast({
          title: "Something went wrong.",
          description: selectedRows.length === 1 ? "Your product was not deleted. Please try again." : "Your products were not deleted. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          description: selectedRows.length === 1 ? "Your product has been deleted." : "Your products have been deleted.",
        })
      }
    });

  });

  return (
    <form className="mr-2" onSubmit={onSubmit}>
      <Input id="ids" type="hidden" {...register("ids")} />
      <button
        type="submit"
        className={cn(buttonVariants({ size: "sm", variant: "destructive" }))}
        disabled={isPending || disabled}
      >
        {isPending && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        <span>{isPending ? "" : "Delete"}</span>
      </button>
    </form>
  )
}