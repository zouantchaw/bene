import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { CreateProductForm } from "@/components/forms/create-product-form";
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"


export default async function CreateProductPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Rental Product" text="Add to your inventory." backLink="/dashboard/inventory">
      </DashboardHeader>
      <CreateProductForm user={{ id: user.id, name: user.name || "" }} />
    </DashboardShell>
  );
}