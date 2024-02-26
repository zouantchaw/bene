import prisma from "@/lib/prisma";
import {
  Divider,
  Tab,
  TabGroup,
  TabList,
  TextInput,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import InviteMemberButton from "@/components/invite-member-button";
import InviteMemberModal from "@/components/modal/invite-member";

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
        <InviteMemberButton>
          <InviteMemberModal />
        </InviteMemberButton>
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
