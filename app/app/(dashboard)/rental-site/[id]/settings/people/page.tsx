import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateRentalSite } from "@/lib/actions";
import {
  Divider,
  Tab,
  TabGroup,
  TabList,
  TextInput,
  TabPanel,
  TabPanels,
} from "@tremor/react";

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
    <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
      <div className="flex justify-between p-5">
        <h2 className="font-cal text-xl dark:text-white">People</h2>
        <button className="flex items-center justify-center rounded-md border border-black bg-black px-4 py-2 text-sm text-white transition-all hover:bg-white hover:text-black dark:border-stone-700 dark:text-white dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
          <p>Invite</p>
        </button>
      </div>
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Teammates that have access to this project.
        </p>
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Members</Tab>
            <Tab>Invitations</Tab>
          </TabList>
          <div className="mt-8 space-y-8">
            <TabPanels>
              <TabPanel>{/* Content for Members Tab */}</TabPanel>
              <TabPanel>{/* Content for Invitations Tab */}</TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
}
