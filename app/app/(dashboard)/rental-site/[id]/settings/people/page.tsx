import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateRentalSite } from "@/lib/actions";
import { Divider, Tab, TabGroup, TabList, TextInput, TabPanel, TabPanels } from "@tremor/react";


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
    <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">People</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Manage members and invitations for your site.
        </p>
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Members</Tab>
            <Tab>Invitations</Tab>
          </TabList>
          <div className="mt-8 space-y-8">
            <TabPanels>
              <TabPanel>
                <div>
                  <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Add Member
                  </h4>
                  <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    Enter the email address of the member you wish to add.
                  </p>
                  <div className="mt-6">
                    <button className="flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10 border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
                      <p>Invite</p>
                    </button>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
    </div>
  );
}
