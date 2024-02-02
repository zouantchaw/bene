import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPostData, getProductData, getSiteData, getRentalSiteData } from "@/lib/fetchers";
import BlogCard from "@/components/blog-card";
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getProductData(domain, slug),
    getRentalSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

export async function generateStaticParams() {
  const allProducts = await prisma.product.findMany({
    select: {
      slug: true,
      rentalSite: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
    // feel free to remove this filter if you want to generate paths for all posts
    where: {
      rentalSite: {
        subdomain: "demo",
      },
    },
  });

  const allPaths = allProducts
    .flatMap(({ rentalSite, slug }) => [
      rentalSite?.subdomain && {
        domain: `${rentalSite.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      rentalSite?.customDomain && {
        domain: rentalSite.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function RentalSiteProductPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getProductData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <h1 className="mb-4 font-title text-3xl font-bold text-stone-800 dark:text-white md:text-5xl">
            {data.title}
          </h1>
          <p className="mb-2 text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg">
            {data.description}
          </p>
          <p className="text-sm font-light text-stone-500 dark:text-stone-400">
            {/* {toCurrencyString(data.price)} */}
          </p>
        </div>
      </div>
      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
        <BlurImage
          alt={data.title ?? "Product image"}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          src={data.image ?? "/placeholder.png"}
        />
      </div>

      <MDX source={data.mdxSource} />

      {data.adjacentProducts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Related Products
            </span>
          </div>
        </div>
      )}
      {data.adjacentProducts && (
        <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentProducts.map((product: any, index: number) => (
            <BlogCard key={index} data={product} />
          ))}
        </div>
      )}
    </>
  );
}
