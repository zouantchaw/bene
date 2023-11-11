import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={Math.random() > 0.5 ? "Frederick Party Rentals" : "Diane Decorations"} text="Orders">
        <Button>Create order</Button>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="shoppingCart" />
          <EmptyPlaceholder.Title>No orders</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any orders yet. Get started by creating your first order.
          </EmptyPlaceholder.Description>
          <Button variant="outline">Create order</Button>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  )
}
