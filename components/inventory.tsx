import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PostCard from "./post-card";
import InventoryCard from "./inventory-card";
import Image from "next/image";

export default async function Inventory({
  rentalSiteId,
  limit,
}: {
  rentalSiteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const inventory = await prisma.product.findMany({
    where: {
      rentalSiteId: rentalSiteId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      rentalSite: true,
    },
    ...(limit ? { take: limit } : {}),
  });
  console.log("inventory", inventory);

  return inventory.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {inventory.map((product) => (
        <InventoryCard key={product.id} data={product} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Products Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any products in your inventory yet. Create one to get started.
      </p>
    </div>
  );
}
