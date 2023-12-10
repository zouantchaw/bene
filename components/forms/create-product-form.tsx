'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dropzone } from "@/components/shared/dropzone";

export function CreateProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [tags, setTags] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1); // Added state for quantity
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Added state for current image index

  useEffect(() => {
    if (currentImageIndex >= productImages.length) {
      setCurrentImageIndex(productImages.length - 1);
    }
  }, [productImages, currentImageIndex]);

  const handleImageClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % productImages.length);
  }

  return (
    <div key="1" className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start w-full px-4 mx-auto">
      <div className="grid gap-4 md:gap-10 items-start">
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="productImages">
              Images
            </Label>
            <Dropzone
              onChange={(files) => {
                setProductImages(files);
                setCurrentImageIndex(0);
              }}
              className="w-full"
              fileExtension="png"
              maxFiles={3}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="name">
              Name
            </Label>
            <Input className="border p-2 rounded-md" id="name" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter product name" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="tags">
              Tags
            </Label>
            <Input className="border p-2 rounded-md" id="tags" placeholder="Enter tags separated by commas" value={tags} onChange={e => setTags(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="description">
              Description
            </Label>
            <TextArea className="border p-2 rounded-md" id="description" value={productDescription} onChange={e => setProductDescription(e.target.value)} placeholder="Enter product description" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="price">
              Price (per day)
            </Label>
            <Input className="border p-2 rounded-md" id="price" value={rentalPrice} onChange={e => setRentalPrice(e.target.value)} placeholder="Enter rental price" type="number" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Input
              className="border p-2 rounded-md"
              id="quantity"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              type="number"
            />
          </div>
        </form>
      </div>
      <div className="md:col-span-1">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden dark:border-gray-800">
          <CardHeader className="p-0">
            {productImages.length > 0 ? (
              <img
                alt="Product Image"
                className="aspect-square object-cover w-full rounded-t-lg cursor-pointer"
                height="600"
                src={productImages[currentImageIndex]}
                width="600"
                onClick={handleImageClick}
              />
            ) : <img src="https://placehold.co/600x400" alt="Placeholder" />}
          </CardHeader>
          <CardContent className="p-4 bg-white dark:bg-gray-800">
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">{productName || "Product Name"}</h2>
            <div className="flex flex-wrap mt-2">
              {tags.length > 0 ? tags.split(',').map((tag, index) => (
                <Badge key={index} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">{tag}</Badge>
              )) : <Badge className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">Tags</Badge>}
            </div>
            <p className="text-md text-gray-900 dark:text-white">${rentalPrice || "0.00"}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{productDescription || "Product Description"}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Quantity: {quantity || "1"}</p>
          </CardContent>
        </Card>
      </div>
      <Button size="lg">Create Rental Product</Button>
    </div>
  )
}