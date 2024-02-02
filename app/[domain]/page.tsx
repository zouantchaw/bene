import Link from "next/link";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { getProductsForRentalSite, getRentalSiteData } from "@/lib/fetchers";
import Image from "next/image";
import PostCard from "../../components/post-card";

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
        {products.length > 0 ? (
          <div className="mx-auto w-full max-w-screen-xl md:mb-28 lg:w-5/6">
            {products.map((product: any, index: number) => (
              <Link href={`/${product.slug}`} key={index}>
                <div className="mx-auto mt-10 w-5/6 lg:w-full">
                  <h2 className="my-10 font-title text-4xl dark:text-white md:text-6xl">
                    {product.title}
                  </h2>
                  <p className="w-full text-base dark:text-white md:text-lg lg:w-2/3">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
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

      {products.length > 1 && (
        <div className="mx-5 mb-20 max-w-screen-xl lg:mx-24 2xl:mx-auto">
          <h2 className="mb-10 font-title text-4xl dark:text-white md:text-5xl">
            More products
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(1).map((metadata: any, index: number) => (
              <PostCard key={index} data={metadata} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
