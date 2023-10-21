"use client";
import Link from "next/link";
import { NumberInput, Card, Grid, Badge, Select, SelectItem, DateRangePicker } from "@tremor/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import CreateEventModal from "@/components/modal/create-event";
import { useModal } from "@/components/modal/provider";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { LocalWallet } from "@thirdweb-dev/wallets";
import { Mumbai } from "@thirdweb-dev/chains";

interface LocalWalletData {
  address: string;
  data: string;
  strategy: "mnemonic" | "privateKey" | "encryptedJson";
  isEncrypted: boolean;
}


interface Product {
  name: string;
  price: number;
  image: JSX.Element;
}

interface QuoteItem extends Product {
  quantity: number;
}

const wallet = new LocalWallet({
  walletId: "bene",
  chain: Mumbai,
  storage: {
    getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
  }
});
console.log("wallet", wallet);

const exampleSvg = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      fontSize: 32,
      fontWeight: 600,
    }}
  >
    <svg
      width="75"
      viewBox="0 0 75 65"
      fill="#000"
      style={{ margin: "0 75px" }}
    >
      <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
    </svg>
    <div style={{ marginTop: 40 }}>Folding Chair</div>
  </div>
);

const products = [
  {
    name: "Folding Chair",
    price: 2.50,
    image: (
      <Image
        src="/folding-chair.webp"
        alt="Picture of the author"
        width={100}
        height={100}
        className="rounded-lg shadow-lg"
      />
    ),
  },
  {
    name: "Round Table",
    price: 5.00,
    image: exampleSvg(),
  },
  {
    name: "Square Table",
    price: 5.00,
    image: exampleSvg(),
  },
  {
    name: "King Chair",
    price: 200,
    image: exampleSvg(),
  },
];

export default function SiteHomePage() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const savedProducts = window.localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const modal = useModal();

  useEffect(() => {
    window.localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    if (modal) {
      modal.show(<CreateEventModal />);
    }
  }, []);

  const addToQuote = (product: Product, quantity: number) => {
    const updatedProducts = {
      ...selectedProducts,
      [product.name]: {
        price: product.price,
        quantity,
      },
    };
    setSelectedProducts(updatedProducts);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      {/* Banner */}
      <div className="bg-gray-200 text-center py-20">
        <h1 className="text-4xl font-bold">Your Event. Our Rentals.</h1>
      </div>

      {/* Product Grid */}
      <div className="mx-5 my-20 lg:mx-24 2xl:mx-auto">
        <Grid className="grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: Product, index: number) => (
            <Card key={index} className="flex flex-col p-4 border hover:shadow-lg transition">
              <div className="flex-1">
                <div className="h-44 mb-4">{product.image}</div>
                <Badge size="lg" className="mb-2">{product.name}</Badge>
                <Badge size="xs" className="mb-2">${product.price.toFixed(2)}</Badge>
              </div>
              <NumberInput
                placeholder="Quantity"
                onChange={(event) =>
                  addToQuote(product, Number(event.target.value))
                }
                className="mt-auto"
              />
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  );
}