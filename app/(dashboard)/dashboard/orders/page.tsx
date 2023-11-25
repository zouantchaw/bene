import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Orders",
}


// TODO: Add onboarding component and logic
export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Orders" text="">
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