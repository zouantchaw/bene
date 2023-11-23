import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

export default async function CreateProductPage () {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Product" text="" />
      <div>
        Hey
      </div>
    </DashboardShell>
  )
}