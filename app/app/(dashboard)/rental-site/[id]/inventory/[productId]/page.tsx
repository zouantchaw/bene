import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import InventoryEditor from "@/components/inventory-editor";

export default async function RentalProductCreatePage({ params }: { params: { id: string, productId: string } }) {

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  console.log("params", params);
  const data = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.productId),
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
