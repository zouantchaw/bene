import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

export default async function CreateProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Product" text="Add a new product to your inventory." backLink="/dashboard/inventory">
      {/* <Link href="/dashboard/inventory" className={cn(buttonVariants({ size: "default", variant: "default" }))}>
        <Icons.arrowLeft className="h-4 w-4 mr-2" />
        Back
      </Link> */}
      </DashboardHeader>
    </DashboardShell>
  );
}