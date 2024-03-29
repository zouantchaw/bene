import { Suspense } from "react";
import RentalSites from "@/components/rental-sites";
import OverviewStats from "@/components/overview-stats";
import PlaceholderCard from "@/components/placeholder-card";
import OverviewRentalSitesCTA from "@/components/overview-rental-sites-cta";

export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>
        <OverviewStats />
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Top Rental Sites
          </h1>
          <Suspense fallback={null}>
            <OverviewRentalSitesCTA />
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
          <RentalSites limit={4} />
        </Suspense>
      </div>
    </div>
  );
}
