import Link from "next/link"
import { Icons } from "@/components/shared/icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

interface ProductPreviewProps {
  images: string[]
  name: string
  description: string
  tags: string[]
  price: number
  quantity: number
}

export function ProductPreview({
  images,
  name,
  description,
  tags,
  price,
  quantity,
}: ProductPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={images[0]} alt={name} />
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div>Price: {price}</div>
        <div>Quantity: {quantity}</div>
        <div>Tags: {tags.join(', ')}</div>
      </CardFooter>
    </Card>
  )
}
