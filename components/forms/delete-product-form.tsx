"use client"

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"

import { deleteProduct, type DeleteProductFormData } from "@/lib//actions"

interface DeleteProductFormProps {
  user: Pick<User, "id">
  selectedRows: string[]
}

export function DeleteProductForm({ user, selectedRows }: DeleteProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const deleteProductWithId = deleteProduct.bind(null, user.id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DeleteProductFormData>({
    resolver: zodResolver(userNameSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log("data", data)
    startTransition(async () => {
      const { status } = await deleteProductWithId(data);

      if (status !== "success") {
        toast({
          title: "Something went wrong.",
          description: "Your name was not updated. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          description: "Your name has been updated.",
        })
      }
    });

  });

  return (
    <form className="mr-2" onSubmit={onSubmit}>
      <Input id="id" type="hidden" {...register("id")} value={selectedRows} />
      <button
        type="submit"
        className={cn(buttonVariants({ size: "sm",variant: "destructive"  }))}
        disabled={isPending}
      >
        {isPending && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        <span>{isPending ? "" : "Delete"}</span>
      </button>
    </form>
  )
}