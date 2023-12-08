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
      title: "Overview",
      href: "/dashboard",
      icon: "layoutDashboard",
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: "warehouse",
    },
    // {
    //   title: "Orders",
    //   href: "/dashboard/orders",
    //   icon: "ganttChartSquare",
    // },
    // {
    //   title: "Billing",
    //   href: "/dashboard/billing",
    //   icon: "billing",
    // },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
