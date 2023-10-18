"use client";
import Link from "next/link";
import { NumberInput, Card, Grid, Badge, Select, SelectItem, DateRangePicker } from "@tremor/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import CreateEventModal from "@/components/modal/create-event";
import { useModal } from "@/components/modal/provider";


interface Product {
  name: string;
  price: number;
  image: JSX.Element;
}

interface QuoteItem extends Product {
  quantity: number;
}

const foldingChairSvg = () => (
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

const roundTableSvg = () => (
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
    <div style={{ marginTop: 40 }}>Round Table</div>
  </div>
);
const squareTableSvg = () => (
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
    <div style={{ marginTop: 40 }}>Square Table</div>
  </div>
);

const kingChairSvg = () => (
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
    <div style={{ marginTop: 40 }}>King Chair</div>
  </div>
);

const products = [
  {
    name: "Folding Chair",
    price: 2.50,
    image: foldingChairSvg(),
  },
  {
    name: "Round Table",
    price: 5.00,
    image: roundTableSvg(),
  },
  {
    name: "Square Table",
    price: 5.00,
    image: squareTableSvg(),
  },
  {
    name: "King Chair",
    price: 200,
    image: kingChairSvg(),
  },
];

export default function SiteHomePage() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    // Get the existing quote data from localStorage if available
    const savedProducts = window.localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const modal = useModal();

  useEffect(() => {
    if (modal) {
      modal.show(<CreateEventModal />);
    }
  }, []);



  useEffect(() => {
    // Update localStorage whenever the quote state changes
    window.localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

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
    <>
      <div className="mx-auto mb-20 w-full max-w-screen-xl">
        <div className="bg-white py-10 text-center">
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "black",
              lineHeight: 1.4,
            }}
          >
            Your Event. Our Rentals.
          </div>
        </div>

        <div className="mx-5 mb-20 lg:mx-24 2xl:mx-auto">
          <Grid className="grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product: Product, index: number) => (
              <Card key={index}>
                <div className="h-44">{product.image}</div>
                <Badge size="lg" className="m-2 my-2">
                  {product.name}
                </Badge>
                <Badge size="xs" className="my-2">
                  ${product.price}
                </Badge>
                <NumberInput
                  placeholder="Quantity"
                  onChange={(event) =>
                    addToQuote(product, Number(event.target.value))
                  }
                />
              </Card>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
} 
