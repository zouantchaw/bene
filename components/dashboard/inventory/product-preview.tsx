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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

interface ProductPreviewProps {
  images?: string[]
  name?: string
  description?: string
  tags?: string[]
  price?: number
  quantity?: number
}

const placeholderImageLink = "https://placehold.co/600x400";

export function ProductPreview({
  images = [],
  name = "Product Name",
  description = "Product Description",
  tags = [],
  price = 0,
  quantity = 0,
}: ProductPreviewProps) {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Carousel>
          <CarouselPrevious className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2" />
          <CarouselContent>
            {(images.length > 0 ? images : [placeholderImageLink]).map((image, index) => (
              <CarouselItem key={index}>
                <Image src={image} alt={`${name} image ${index + 1}`} width={600} height={400} className="w-full h-full object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2" />
        </Carousel>
      </div>
      <CardContent className="p-4">
        <CardHeader className="mb-2">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardDescription className="text-gray-700 mb-2">{description}</CardDescription>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">${price}</div>
          <div className="text-lg font-bold">{quantity}</div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-semibold"></div>
          {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
