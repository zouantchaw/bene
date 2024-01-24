import { Suspense } from "react";
import RentalSites from "@/components/rental-sites";
import PlaceholderCard from "@/components/placeholder-card";
import CreateSiteButton from "@/components/create-site-button";
import CreateRentalSiteModal from "@/components/modal/create-rental-site";

export default function AllRentalSites({ params }: { params: { id: string } }) {
  console.log(params);
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Rental Sites
          </h1>
          <CreateSiteButton>
            <CreateRentalSiteModal />
          </CreateSiteButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <RentalSites siteId={decodeURIComponent(params.id)} />
        </Suspense>
      </div>
    </div>
  );
}
