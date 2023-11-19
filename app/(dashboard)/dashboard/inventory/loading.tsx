import { CardSkeleton } from "@/components/shared/card-skeleton"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Inventory" text="Create and manage orders.">
        <Button>Create Product</Button>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
