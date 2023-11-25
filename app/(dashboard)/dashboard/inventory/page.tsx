import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { CreateProduct } from "@/components/dashboard/inventory/buttons"

export const metadata = {
  title: "Inventory",
}

export default async function InventoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Inventory" text="">
        <CreateProduct variant="default" />
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="warehouse" /> 
          <EmptyPlaceholder.Title>No products</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any products yet. Get started by creating your first product.
          </EmptyPlaceholder.Description>
          <CreateProduct variant="outline" />
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  )
}
