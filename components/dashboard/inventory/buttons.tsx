'use client';
import { Button, buttonVariants } from "@/components/ui/button";
import { useCreateProductModal } from "@/hooks/use-create-product";
import Link from "next/link";
import { cn } from "@/lib/utils";


export const CreateProduct = ({ variant }) => {
  const productModal = useCreateProductModal();

  return (
    // <Button className="px-3" variant="default" size="lg" onClick={productModal.onOpen}>Create Product</Button>
    <Link href="/dashboard/inventory/create" className={cn(buttonVariants({ size: "default" }))}>
      Create Product
    </Link>
  )
};