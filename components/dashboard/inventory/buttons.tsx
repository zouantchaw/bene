'use client';
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";
import { useCreateProductModal } from "@/hooks/use-create-product";


export const CreateProduct = ({ variant }) => {
  const productModal = useCreateProductModal();

  return (
    <Button className="px-3" variant="default" size="lg" onClick={productModal.onOpen}>Create Product</Button>
  )
};