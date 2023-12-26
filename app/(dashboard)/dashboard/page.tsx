import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { CreateProduct } from "@/components/dashboard/inventory/buttons"

export const metadata = {
  title: "Dashboard",
}


// TODO: Add onboarding component and logic
export default async function DashboardPage() {
  const user = await getCurrentUser()
  const getNameFromEmail = user?.email?.split("@")[0];
  console.log("getNameFromEmail", getNameFromEmail);
  console.log("user", user);

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={user.name ? `${user.name}` : `${getNameFromEmail}`} text="Welcome, here's what's happening with your rentals.">
        <CreateProduct variant="default" />
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="warehouse" />
          <EmptyPlaceholder.Title>No products</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any products in your inventory yet. Get started by creating your first product.
          </EmptyPlaceholder.Description>
          <CreateProduct variant="default" />
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  )
}
