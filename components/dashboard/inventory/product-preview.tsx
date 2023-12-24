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
    <Card className="shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Carousel>
          <CarouselPrevious className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2" />
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img src={image} alt={`${name} image ${index + 1}`} className="w-full h-64 object-cover" />
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
          <div className="text-lg font-bold">Price: {price}</div>
          <div className="text-lg font-bold">Quantity: {quantity}</div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-semibold">Tags:</div>
          {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
