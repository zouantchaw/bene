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
import { Trash2 } from "lucide-react";

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
          user: true, 
        },
      },
    },
  });

  if (!data) {
    return <div>Not found</div>;
  }
  const owner = data.users.find((user) => user.role === "owner");
  const members = data.users.filter((user) => user.role === "member");
  const rentalSiteName = data.name;
  const rentalSiteLogo = data.logo;
  const rentalSiteSubdomain = data.subdomain;

  return (
    <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
      <div className="flex justify-between p-5">
        <h2 className="font-cal text-xl dark:text-white">People</h2>
        <InviteMemberButton>
          <InviteMemberModal name={rentalSiteName || ""} logo={rentalSiteLogo || ""} subdomain={rentalSiteSubdomain || ""} />
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
                  <div className="flex w-full items-center justify-between">
                    <div className="flex space-x-3">
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
                      <div className="text-stone-900 dark:text-stone-100 flex flex-col justify-center">
                        <span className="text-sm font-medium">
                          {owner.user.name}
                        </span>
                        <span className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                          {owner.user.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{owner.role.charAt(0).toUpperCase() + owner.role.slice(1)}</span>
                      <Trash2
                        size={15}
                        className="cursor-pointer text-stone-700 hover:text-red-500"
                      />
                    </div>
                  </div>
                )}
                <Divider />
                {members.map((member) => (
                  <div
                    className="flex w-full items-center justify-between"
                    key={member.user.id}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={
                          member.user.image ??
                          `https://avatar.vercel.sh/${member.user.email}`
                        }
                        width={20}
                        height={20}
                        alt={member.user.name ?? "Member avatar"}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className="text-sm font-medium">
                        {member.user.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{member.role}</span>
                      <Trash2
                        size={15}
                        className="cursor-pointer text-stone-700 hover:text-red-500"
                      />
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel>{/* Content for Invitations Tab */}</TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
}
