import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import InventoryEditor from "@/components/inventory-editor";

export default async function InventoryPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      rentalSite: {
        include: {
          users: true, // Include the RentalSiteUsers relation
        },
      },
    },
  });
  
  if (!data || !data.rentalSite || !data.rentalSite.users.some(user => user.userId === session.user.id)) {
    notFound();
  }

  return <InventoryEditor product={data} />;
}
