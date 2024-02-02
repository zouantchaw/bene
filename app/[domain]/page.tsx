import Link from "next/link";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { getProductsForRentalSite, getRentalSiteData } from "@/lib/fetchers";
import Image from "next/image";
import PostCard from "../../components/post-card";
import BlogCard from "../../components/blog-card";

export default async function RentalSiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, products] = await Promise.all([
    getRentalSiteData(domain),
    getProductsForRentalSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="mb-20 w-full">
        <div className="group relative mx-auto h-80 w-full overflow-hidden sm:h-150 lg:rounded-xl">
          <BlurImage
            alt={data.name ?? ""}
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            className="h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
            width={1300}
            height={630}
            placeholder="blur"
            src={data.image ?? "/placeholder.png"}
          />
        </div>
        <div className="mx-auto w-full max-w-screen-xl md:mb-28 lg:w-5/6">
          {products.length > 0 ? (
            <div className="mt-10">
              <h1 className="text-center font-title text-5xl dark:text-white md:text-6xl">
                {data.name}
              </h1>
              <p className="mx-auto mt-5 text-center text-lg dark:text-white md:text-xl lg:w-2/3">
                {data.description}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: any, index: number) => (
                  <BlogCard key={index} data={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <Image
                alt="no products"
                src="https://illustrations.popsy.co/gray/success.svg"
                width={400}
                height={400}
                className="dark:hidden"
              />
              <Image
                alt="no products"
                src="https://illustrations.popsy.co/white/success.svg"
                width={400}
                height={400}
                className="hidden dark:block"
              />
              <p className="font-title text-2xl text-stone-600 dark:text-stone-400">
                No products yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
