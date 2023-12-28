import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { CreateProduct } from "@/components/dashboard/inventory/buttons"
import { Product, columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata = {
  title: "Inventory",
}

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Green Chair",
      description: "A luxurious gold chair",
      tags: ["furniture"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 8,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Safire Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Pink Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 8,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 8,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Blue Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 8,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    {
      id: "728ed52f",
      image: "https://placehold.co/600x400",
      name: "Gold Chair",
      description: "A luxurious gold chair",
      tags: ["furniture", "chair", "gold"],
      price: 3.99,
      quantity: 100,
      available: 78,
    },
    // ...
  ]
}

export default async function InventoryPage() {
  const data = await getData()
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell className="ml-1">
      <DashboardHeader heading="Inventory" text="">
        <CreateProduct variant="default" />
      </DashboardHeader>
      <div>
        {/* <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="warehouse" /> 
          <EmptyPlaceholder.Title>No products</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any products yet. Get started by creating your first product.
          </EmptyPlaceholder.Description>
          <CreateProduct variant="outline" />
        </EmptyPlaceholder> */}
        <DataTable columns={columns} data={data} />

      </div>
    </DashboardShell>
  )
}
