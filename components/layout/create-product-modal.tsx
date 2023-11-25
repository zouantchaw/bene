"use client";

import { useState } from "react";

import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";
import { siteConfig } from "@/config/site";
import { UserAuthForm } from "@/components/forms/user-auth-form"
import Link from "next/link"
import { useCreateProductModal } from "@/hooks/use-create-product";
// import { CreateProductForm } from "@/components/forms/create-product-form";

export const CreateProductModal = () => {
  const createProductModal = useCreateProductModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={createProductModal.isOpen} setShowModal={createProductModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <Icons.logo className="h-10 w-10" />
          <h3 className="font-urban text-2xl font-bold">Create a new product</h3>
          <a
            href={`https://lovethegame.eth.limo/`}
            target="_blank"
            rel="noopener noreferrer"
            className="-translate-y-2 text-center text-xs text-gray-500 underline underline-offset-4 hover:text-gray-800"
          >
            What is a product?
          </a>
        </div>
        {/* <CreateBrandForm /> */}
      </div>
    </Modal>
  );
};