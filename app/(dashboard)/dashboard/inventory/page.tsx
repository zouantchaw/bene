import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { CreateProduct } from "@/components/dashboard/inventory/buttons"
import { Product, columns } from "@/components/dashboard/inventory/columns"
import { DataTable } from "@/components/dashboard/inventory/data-table"
import { getProducts } from "@/lib/actions"

export const metadata = {
  title: "Inventory",
}

export default async function InventoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getProductsWithId = getProducts.bind(null, user.id)
  const { products } = await getProductsWithId()
  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      image: product.images[0],
      name: product.name,
      description: product.description,
      tags: product.tags.map(tag => tag.split(' ').join(', ')),
      price: product.price,
      quantity: product.quantity,
    }
  }
  )

  return (
    <DashboardShell className="ml-1">
      <DashboardHeader heading="Inventory" text="Manage your inventory.">
        <CreateProduct variant="default" />
      </DashboardHeader>
      <div>
        {formattedProducts.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="warehouse" /> 
            <EmptyPlaceholder.Title>No products</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any products yet. Get started by creating your first product.
            </EmptyPlaceholder.Description>
            <CreateProduct variant="outline" />
          </EmptyPlaceholder>
        ) : (
          <DataTable user={user} columns={columns} data={formattedProducts} />
        )}
      </div>
    </DashboardShell>
  )
}
