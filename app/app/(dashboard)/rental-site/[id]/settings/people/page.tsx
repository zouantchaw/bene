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
import Image from "next/image";
import { Trash2 } from 'lucide-react';

export default async function RentalSiteSettingsPeople({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.rentalSite.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      users: {
        include: {
          user: true, // Include the User relation
        },
      }, 
    },
  });

  if (!data) {
    return <div>Not found</div>;
  }

  const owner = data.users.find((user) => user.role === "owner");
  console.log("owner", owner);

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
              <TabPanel>
              {owner && (
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={
                        owner.user.image ??
                        `https://avatar.vercel.sh/${owner.user.email}`
                      }
                      width={20}
                      height={20}
                      alt={owner.user.name ?? "Owner avatar"}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="text-sm font-medium">{owner.user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">{owner.role}</span>
                    <Trash2 size={15} className="cursor-pointer text-stone-700 hover:text-red-500" />
                  </div>
                </div>
              )}
              </TabPanel>
              <TabPanel>{/* Content for Invitations Tab */}</TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
}
