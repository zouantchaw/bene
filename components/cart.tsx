"use client";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  NumberInput,
  Card,
  Text,
  Tracker,
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
} from "@tremor/react";
import useWindowSize from "@/lib/hooks/use-window-size";
import Leaflet from "./modal/leaflet";
import { ShoppingCart } from "lucide-react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "../lib/utils";

interface Product {
  name: string;
  price: number;
  image: JSX.Element;
}

export default function ShoppingCartComponent() {
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, { price: number; quantity: number }>
  >(() => {
    const savedProducts = window.localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const [eventDetails, setEventDetails] = useState(() => {
    const savedEventDetails = window.localStorage.getItem("eventDetails");
    return savedEventDetails ? JSON.parse(savedEventDetails) : {};
  });
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [securityDeposit, setSecurityDeposit] = useState(100);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [pending, setPending] = useState(false);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const ConfirmAndSignContent = () => (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium text-stone-500 dark:text-stone-400"
        >
          I accept the terms and conditions
        </label>
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <label
          htmlFor="signature"
          className="text-sm font-medium text-stone-500 dark:text-stone-400"
        >
          Sign
        </label>
        <input
          name="signature"
          type="text"
          placeholder="Type your full name"
          required
          className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
        />
      </div>
    </div>
  );

  const CheckoutContent = () => (
    <div className="flex flex-col space-y-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
        className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
      >
        <TextInput
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cardNumber: e.target.value })
          }
          required
        />

        <TextInput
          name="cardHolder"
          placeholder="Card Holder"
          value={cardDetails.cardHolder}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cardHolder: e.target.value })
          }
          required
        />

        <TextInput
          name="expiryDate"
          placeholder="MM/YY"
          value={cardDetails.expiryDate}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, expiryDate: e.target.value })
          }
          required
        />

        <NumberInput
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cvv: e.target.value })
          }
          required
        />
      </form>
    </div>
  );
  const { isMobile, isDesktop } = useWindowSize();

  const totalCost = Object.values(selectedProducts).reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity + securityDeposit + deliveryFee,
    0,
  );

  const CheckoutStepper = () => (
    <Card className="relative flex flex-col space-y-4 p-5 md:p-10">
      <h2 className="font-cal text-2xl dark:text-white">
        {tabIndex === 0 ? "Order" : "Checkout"}
      </h2>
      <Tracker
        data={[
          { key: "Order", color: tabIndex >= 0 ? "green" : "gray" },
          { key: "Checkout", color: tabIndex >= 1 ? "green" : "gray" },
        ]}
        className="mb-5 mt-2 h-1"
      />
      {tabIndex === 0 && <CartContent />}
      {tabIndex === 1 &&
        (setPending(false),
        (
          <AccordionList>
            <Accordion>
              <AccordionHeader>Confirm and Sign</AccordionHeader>
              <AccordionBody>
                <ConfirmAndSignContent />
              </AccordionBody>
            </Accordion>
            <Accordion>
              <AccordionHeader>Checkout</AccordionHeader>
              <AccordionBody>
                <CheckoutContent />
              </AccordionBody>
            </Accordion>
          </AccordionList>
        ))}
      <div className="w-full">
        <Button
          className={cn(
            "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
            pending
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          size="xl"
          onClick={() => {
            setPending(true);
            setTimeout(() => {
              handleTabChange(tabIndex + 1);
            }, 3000);
          }}
          disabled={termsAccepted || pending}
        >
          {pending ? (
            <LoadingDots color="#808080" />
          ) : tabIndex === 0 ? (
            <div className="flex flex-row justify-between space-x-10">
              <span className="text-sm">Continue to checkout</span>
              <span className="text-sm">${totalCost.toFixed(2)}</span>
            </div>
          ) : (
            "Pay"
          )}
        </Button>
      </div>
    </Card>
  );

  const ProductCard = ({
    product,
    details,
  }: {
    product: string;
    details: any;
  }) => (
    <Card className="mb-4 p-4">
      <div className="flex justify-between">
        <Text>{product}</Text>
        <NumberInput
          value={details.quantity}
          onChange={(e) => {
            const updatedProduct = { ...selectedProducts };
            updatedProduct[product].quantity = Number(e.target.value);
            setSelectedProducts(updatedProduct);
          }}
        />
      </div>
      <Text>${details.price.toFixed(2)}</Text>
    </Card>
  );

  const SecurityDepositCard = ({
    product,
    details,
  }: {
    product: string;
    details: any;
  }) => (
    <Card className="mb-4 p-4">
      <div className="flex justify-between">
        <Text>{product}</Text>
        <Text>${details.price.toFixed(2)}</Text>
      </div>
      <span className="text-sm text-gray-500">Fully refundable</span>
    </Card>
  );

  const DeliveryFeeCard = ({
    product,
    details,
  }: {
    product: string;
    details: any;
  }) => (
    <Card className="mb-4 p-4">
      <div className="flex justify-between">
        <Text>{product}</Text>
        <Text>${deliveryFee.toFixed(2)}</Text>
      </div>
    </Card>
  );

  const CartContent = () => (
    <div className="flex flex-col space-y-2">
      {Object.entries(selectedProducts).map(([product, details]) => (
        <ProductCard key={product} product={product} details={details} />
      ))}
      <DeliveryFeeCard product="Delivery Fee" details={{ price: 50 }} />
      <SecurityDepositCard
        product="Security Deposit"
        details={{ price: securityDeposit }}
      />
    </div>
  );

  useEffect(() => {
    window.localStorage.setItem(
      "selectedProducts",
      JSON.stringify(selectedProducts),
    );
    window.localStorage.setItem("eventDetails", JSON.stringify(eventDetails));
  }, [selectedProducts, eventDetails]);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="rounded-full bg-black p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart size={24} />
      </button>

      {open && (
        <>
          {isMobile && (
            <Leaflet setShow={setOpen}>
              <Card className="relative flex flex-col space-y-4 p-5 md:p-10">
                <h2 className="font-cal text-2xl dark:text-white">Cart</h2>
                <CheckoutStepper />
              </Card>
            </Leaflet>
          )}
          {isDesktop && (
            <Card className="absolute bottom-20 right-2 flex w-96 flex-col space-y-6 rounded-lg rounded-md border border-red-500 border-stone-200 bg-blue-500 bg-white p-8 shadow-lg animate-in slide-in-from-bottom-5 dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700">
              <div className="relative flex flex-col space-y-4">
                <h2 className="font-cal text-2xl dark:text-white">Cart</h2>
                <CheckoutStepper />
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
