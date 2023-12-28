"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string
  name: string
  description: string
  tags: string[]
  price: number
  quantity: number
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-right font-medium">{formatted}</div>
    },

  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "available",
    header: "Available",
  },
]