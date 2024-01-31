import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { updateProductMetadata } from "@/lib/actions";
import DeletePostForm from "@/components/form/delete-post-form";

export default async function RentalProductSettings({ params }: { params: { id: string, productId: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
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
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Rental Product Settings
        </h1>
        <Form
          title="Rental Product Slug"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this rental product."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: data?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateProductMetadata}
        />

        <Form
          title="Thumbnail image"
          description="The thumbnail image for your Rental Product. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateProductMetadata}
        />

        <DeletePostForm postName={data?.title!} />
      </div>
    </div>
  );
}
