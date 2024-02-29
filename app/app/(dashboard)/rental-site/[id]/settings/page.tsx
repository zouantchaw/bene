import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateRentalSite } from "@/lib/actions";
import DeleteRentalSiteForm from "@/components/form/delete-rental-site-form";

export default async function RentalSiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.rentalSite.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      users: true, // Include RentalSiteUsers relation
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
        handleSubmit={updateRentalSite}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateRentalSite}
      />

      <DeleteRentalSiteForm rentalSiteName={data?.name!} />
    </div>
  );
}
