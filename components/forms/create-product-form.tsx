'use client';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createProduct } from "@/lib/actions";
import { X } from 'lucide-react';

export function CreateProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]); // Added state for image names [1
  const [quantity, setQuantity] = useState(1); // Added state for quantity
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Added state for current image index
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  console.log(imageNames);

  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setCurrentImageIndex(images.length - 1);
    }
    console.log(name, description, price, tags, images, quantity)
  }, [images, currentImageIndex, name]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }

  const handleRemoveImage = (index: number) => {
    setImageNames(imageNames.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <form action={dispatch} className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start w-full px-4 mx-auto">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="images">
            Images
          </Label>
          <div className="grid w-full items-center gap-1.5">
            <Input
              // ref={fileInputRef}
              id="images"
              name="images"
              type="file"
              aria-describedby="images-error"
              multiple={true}
              accept=".png,.jpg,.jpeg"
              onChange={(e) => {
                setImageNames(e.target.files ? Array.from(e.target.files).map(file => file.name) : []);
                setImages(e.target.files ? Array.from(e.target.files).map(file => URL.createObjectURL(file)) : []);
                setCurrentImageIndex(0);
              }} 
              />
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-between">
                <img src={image} alt={`Uploaded ${index}`} className="w-10 h-10 object-cover" />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  <X size={24} />
                </button>
              </div>
            ))}
          </div>
          {state && state.errors?.images ? (
            <div
              id="images-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.images.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="name">
            Name
          </Label>
          <Input className="border p-2 rounded-md" id="name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter product name" aria-describedby="name-error" />
          {state && state.errors?.name ? (
            <div
              id="name-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="tags">
            Tags
          </Label>
          <Input className="border p-2 rounded-md" id="tags" name="tags" placeholder="Enter tags separated by commas" value={tags} onChange={e => setTags(e.target.value)} aria-describedby="tags-error" />
          {state && state.errors?.tags ? (
            <div
              id="tags-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.tags.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="description">
            Description
          </Label>
          <TextArea className="border p-2 rounded-md" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter product description" aria-describedby="description-error" />
          {state && state.errors?.description ? (
            <div
              id="description-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="price">
            Price (per day)
          </Label>
          <Input className="border p-2 rounded-md" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter rental price" type="number" aria-describedby="price-error" />
          {state && state.errors?.price ? (
            <div
              id="price-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.price.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label className="text-base" htmlFor="quantity">
            Quantity
          </Label>
          <Input
            className="border p-2 rounded-md"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
            type="number"
            aria-describedby="quantity-error"
          />
          {state && state.errors?.quantity ? (
            <div
              id="quantity-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.quantity.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <Button type="submit" size="lg">Create Rental Product</Button>
      </div>
      <div className="md:col-span-1">
        <Card className="border-0 shadow-lg rounded-lg overflow-hidden dark:border-gray-800">
          <CardHeader className="p-0">
            {images.length > 0 ? (
              <img
                alt="Product Image"
                className="aspect-square object-cover w-full rounded-t-lg cursor-pointer"
                height="600"
                src={images[currentImageIndex]}
                width="600"
                onClick={handleImageClick}
              />
            ) : <img src="https://placehold.co/600x400" alt="Placeholder" />}
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="font-bold text-2xl">{name || "Product Name"}</h2>
            <div className="flex flex-wrap mt-2">
              {tags.length > 0 ? tags.split(',').map((tag, index) => (
                <Badge key={index} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">{tag}</Badge>
              )) : <Badge className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2">Tags</Badge>}
            </div>
            <p className="text-md text-gray-900 dark:text-white">${price || "0.00"}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{description || "Product Description"}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Quantity: {quantity || "1"}</p>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
