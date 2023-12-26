import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextArea } from "@/components/ui/textarea";
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
      {/* <Link href="/dashboard/inventory" className={cn(buttonVariants({ size: "default", variant: "default" }))}>
        Create Product
      </Link> */}
      </DashboardHeader>
      {/* CreateProductForm */}
      <CreateProductForm user={{ id: user.id, name: user.name || "" }} />
    </DashboardShell>
  );
}