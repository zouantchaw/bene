import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CreatePostButton from "@/components/create-post-button";
import CreateProductButton from "@/components/create-product-button";
import OverviewSitesCTA from "@/components/overview-sites-cta";
import PlaceholderCard from "@/components/placeholder-card";
import OverviewStats from "@/components/overview-stats";
import Sites from "@/components/sites";

export default async function RentalSitePosts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.rentalSite.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      users: true,
    },
  });

  if (!data || !data.users.some((user) => user.userId === session.user.id)) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            Overview
          </h1>
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
        <CreateProductButton />
      </div>
      <div className="flex flex-col space-y-6">
        <OverviewStats />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Orders
          </h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>
    </>
  );
}
