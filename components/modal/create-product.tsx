"use client";

import { toast } from "sonner";
import { createProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";

export default function CreateProductModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState<{
    name: string;
    image: File | null;
    description: string;
    price: number;
    quantity: number;
  }>({
    name: "",
    image: null,
    description: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      name: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image) {
          formData.append("image", data.image);
        }
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());

        createProduct(formData).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Created Product");
            const { id } = res;
            router.refresh();
            router.push(`/product/${id}`);
            modal?.hide();
            toast.success(`Successfully created product!`);
          }
        });
      }}
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">
          Create a new product
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Product Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Awesome Product"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="text-sm font-medium text-stone-500">
            Product Image
          </label>
          <input
            name="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setData({ ...data, image: e.target.files[0] });
              }
            }}
            required
            className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about why my product is so awesome"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-sm font-medium text-stone-500">
            Price
          </label>
          <input
            name="price"
            type="number"
            placeholder="0.00"
            value={data.price}
            onChange={(e) =>
              setData({ ...data, price: parseFloat(e.target.value) })
            }
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-stone-500"
          >
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="0"
            value={data.quantity}
            onChange={(e) =>
              setData({ ...data, quantity: parseInt(e.target.value, 10) })
            }
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateProductFormButton />
      </div>
    </form>
  );
}
function CreateProductFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Create Product</p>}
    </button>
  );
}
