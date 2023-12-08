'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dropzone } from "@/components/shared/dropzone";

export function CreateProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [tags, setTags] = useState("");
  const [productImages, setProductImages] = useState([]);

  return (
    <div key="1" className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start w-full px-4 mx-auto">
      <div className="grid gap-4 md:gap-10 items-start">
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="productImages">
              Product Images
            </Label>
            <Dropzone
              onChange={setProductImages}
              className="w-full"
              fileExtension="png"
              maxFiles={3}
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="name">
              Product Name
            </Label>
            <Input className="border p-2 rounded-md" id="name" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Enter product name" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="description">
              Product Description
            </Label>
            <TextArea className="border p-2 rounded-md" id="description" value={productDescription} onChange={e => setProductDescription(e.target.value)} placeholder="Enter product description" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="price">
              Rental Price (per day)
            </Label>
            <Input className="border p-2 rounded-md" id="price" value={rentalPrice} onChange={e => setRentalPrice(e.target.value)} placeholder="Enter rental price" type="number" />
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="tags">
              Tags
            </Label>
            <Input className="border p-2 rounded-md" id="tags" placeholder="Enter tags separated by commas" value={tags} onChange={e => setTags(e.target.value)} />
          </div>
          <Button size="lg">Create Product</Button>
        </form>
      </div>
      <div className="md:col-span-1">
        <Card className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800">
          <CardHeader className="p-4">
          {productImages.length > 0 ? productImages.map((image, index) => (
              <img
                key={index}
                alt="Product Image"
                className="aspect-square object-cover w-full rounded-lg"
                height="600"
                src={image}
                width="600"
              />
            )) : <img src="https://placehold.co/600x400" alt="Placeholder" />}
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="font-bold text-2xl">{productName || "Product Name"}</h2>
            <div className="flex flex-wrap mt-2">
              {tags.length > 0 ? tags.split(',').map((tag, index) => (
                <Badge key={index} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">{tag}</Badge>
              )) : <Badge className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">Tags</Badge>}
            </div>
            <p className="text-md ">${rentalPrice || "0.00"}</p>
            <p className="mt-4">{productDescription || "Product Description"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}