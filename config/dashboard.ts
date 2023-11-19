import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: "ganttChartSquare",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: "warehouse",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
