"use client";

import { SignInModal } from "@/components/layout/sign-in-modal";
import { useMounted } from "@/hooks/use-mounted";
import { CreateProductModal } from "@/components/layout/create-product-modal";

export const ModalProvider = () => {
  const mounted = useMounted()

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <CreateProductModal />
    </>
  );
};