'use client';
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";


export const CreateProduct = ({ variant }) => {
  const signInModal = useSigninModal();

  return (
    <Button className="px-3" variant="default" size="lg" onClick={signInModal.onOpen}>Create Product</Button>
  )
};