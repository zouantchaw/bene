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
import { CreateProductForm } from "@/components/dashboard/inventory/create-product";

export default async function CreateProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Rental Product" text="Add to your inventory." backLink="/dashboard/inventory">
      {/* <Link href="/dashboard/inventory" className={cn(buttonVariants({ size: "default", variant: "default" }))}>
        Create Product
      </Link> */}
      </DashboardHeader>
      {/* Create product form and preview */}
      <CreateProductForm />
    </DashboardShell>
  );
}