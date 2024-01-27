"use client";
import { DollarSign } from 'lucide-react';
import { Boxes } from 'lucide-react';

import { useEffect, useState, useTransition } from "react";
import { Product } from "@prisma/client";
import { updateProduct, updateProductMetadata } from "@/lib/actions";
import { Editor as NovelEditor } from "novel";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "./icons/loading-dots";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

type ProductWithSite = Product & {
  rentalSite: { subdomain: string | null } | null;
};

export default function InventoryEditor({
  product,
}: {
  product: ProductWithSite;
}) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<ProductWithSite>(product);
  const [hydrated, setHydrated] = useState(false);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.rentalSite?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
    : `http://${data.rentalSite?.subdomain}.localhost:3000/${data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updateProduct(data);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div>
        <button
          onClick={() => {
            const formData = new FormData();
            console.log(data.published, typeof data.published);
            formData.append("published", String(!data.published));
            startTransitionPublishing(async () => {
              await updateProductMetadata(
                formData,
                product.id,
                "published",
              ).then(() => {
                toast.success(
                  `Successfully ${
                    data.published ? "unpublished" : "published"
                  } your product.`,
                );
                setData((prev) => ({ ...prev, published: !prev.published }));
              });
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{data.published ? "Unpublish" : "Publish"}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <input
          type="text"
          placeholder="Gold Chiaviari Chair"
          defaultValue={product?.title || ""}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <div className="flex items-center">
          <Boxes className="h-5 w-5 mr-2" />
          <input
            type="number"
            min="0"
            placeholder="120"
            defaultValue={product?.quantity || ""}
            onChange={(e) => {
              const quantity = Number(e.target.value);
              if (!isNaN(quantity)) {
                setData({ ...data, quantity: quantity });
              }
            }}
            className="dark:placeholder-text-600 w-[10%] border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="4.99"
            defaultValue={product?.price || ""}
            onChange={(e) => {
              const price = Number(e.target.value);
              if (!isNaN(price)) {
                setData({ ...data, price: price });
              }
            }}
            className="dark:placeholder-text-600 w-[10%] border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
        </div>
        <TextareaAutosize
          placeholder="The gold chiavari chair is a classic. It's perfect for weddings, parties, and other events. The chair is made of wood and has a padded seat. It's also lightweight, so it's easy to move around. You can rent this chair for $4.99 per day."
          defaultValue={product?.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor
        className="relative block"
        defaultValue={product?.content || undefined}
        onUpdate={(editor) => {
          setData((prev) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        onDebouncedUpdate={() => {
          if (
            data.title === product.title &&
            data.description === product.description &&
            data.content === product.content
          ) {
            return;
          }
          startTransitionSaving(async () => {
            await updateProduct(data);
          });
        }}
      />
    </div>
  );
}
