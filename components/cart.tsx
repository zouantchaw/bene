"use client";

import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import LoadingDots from "./icons/loading-dots";
import va from "@vercel/analytics";
import { toast } from "sonner";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Item {
  quantity: number;
}

export default function ShoppingCartComponent() {
  const { domain, slug } = useParams() as { domain: string; slug?: string };
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Product 1', price: 10, quantity: 2 },
    { id: '2', name: 'Product 2', price: 15, quantity: 1 },
  ]);
  const [open, setOpen] = useState(false);

  const handleAddToCart = (item: Item) => {
    setCartItems(prevItems => [...prevItems, {...item, quantity: 1}]);
    toast.success(`Added ${item.name} to cart`);
  };

  const handleCheckout = async () => {
    // Artificial 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Replace with your own logic
    va.track("Checked out", { cartItems });
    setOpen(false);
    setCartItems([]);
    toast.success("Successfully checked out");
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="rounded-full bg-black p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart size={24} />
      </button>

      {open && (
        <div
          className="absolute bottom-20 right-2 flex w-96 flex-col space-y-6 rounded-lg border border-stone-200 bg-white p-8 shadow-lg animate-in slide-in-from-bottom-5"
        >
          <div>
            <h2 className="font-cal text-xl leading-7 text-stone-900">
              Shopping Cart
            </h2>
            {cartItems.map(item => (
              <p key={item.id}>{item.name} x{item.quantity} - ${item.price * item.quantity}</p>
            ))}
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
