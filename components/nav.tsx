"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Ungroup,
  Settings,
  FileCode,
  Github,
  Warehouse,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  getSiteFromPostId,
  getRentalSiteFromProductId,
  getRentalSiteNameFromId,
} from "@/lib/actions";
import Image from "next/image";

const externalLinks = [
  {
    name: "Read announcement",
    href: "https://twitter.com/rentbene",
    icon: <Megaphone width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id, productId } = useParams() as {
    id: string;
    productId: string;
  };

  const [siteId, setSiteId] = useState<string | null>();
  const [rentalSiteId, setRentalSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "inventory" && id) {
      getRentalSiteFromProductId(id).then((id) => {
        setRentalSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Posts",
          href: `/site/${id}`,
          isActive: segments.length === 2,
          icon: <Newspaper width={18} />,
        },
        {
          name: "Analytics",
          href: `/site/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        {
          name: "Back to All Posts",
          href: siteId ? `/site/${siteId}` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/post/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "rental-site" && id && !productId) {
      return [
        {
          name: "Back to Rental Sites",
          href: "/rental-sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Overview",
          href: `/rental-site/${id}`,
          isActive: segments.length === 2,
          icon: <LayoutDashboard width={18} />,
        },
        {
          name: "Inventory",
          href: `/rental-site/${id}/inventory`,
          isActive: segments.includes("inventory"),
          icon: <Warehouse width={18} />,
        },
        {
          name: "Analytics",
          href: `/rental-site/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/rental-site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (
      segments[0] === "rental-site" &&
      segments[1] === id &&
      segments[2] === "inventory"
    ) {
      return [
        {
          name: `Back to Inventory`,
          href: `/rental-site/${id}/inventory`,
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/rental-site/${id}/inventory/${productId}`,
          isActive: segments.length === 4,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/rental-site/${id}/inventory/${productId}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      // {
      //   name: "Sites",
      //   href: "/sites",
      //   isActive: segments[0] === "sites",
      //   icon: <Globe width={18} />,
      // },
      {
        name: "Rental Sites",
        href: "/rental-sites",
        isActive: segments[0] === "rental-sites",
        icon: <Globe width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src="/logo.png"
                alt="Bene"
                width={25}
                height={25}
                className="rounded-lg"
              />
            </Link>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
            <h1 className="text-md font-medium">Bene</h1>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
