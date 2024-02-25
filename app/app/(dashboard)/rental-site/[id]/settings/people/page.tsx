import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateRentalSite } from "@/lib/actions";
import { Divider, Tab, TabGroup, TabList, TextInput } from '@tremor/react';


export default async function RentalSiteSettingsPeople({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.rentalSite.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="People"
        description="Teammates that have access to this project."
        helpText="Make sure to add the email addresses of your teammates."
        inputAttrs={{
          name: "people",
          type: "email",
          defaultValue: "",
          placeholder: "Enter member's email",
        }}
        handleSubmit={updateRentalSite}
      />
    </div>
  );
}
