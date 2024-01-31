import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateSiteButton from "./create-site-button";
import CreateRentalSiteModal from "./modal/create-rental-site";
import Link from "next/link";

export default async function OverviewRentalSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  const rentalSites = await prisma.rentalSiteUsers.count({
    where: {
      userId: session.user.id,
    },
  });

  return rentalSites > 0 ? (
    <Link
      href="rental-sites"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Rental Sites
    </Link>
  ) : (
    <CreateSiteButton>
      <CreateRentalSiteModal />
    </CreateSiteButton>
  );
}
