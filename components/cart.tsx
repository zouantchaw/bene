"use client";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  NumberInput,
  Card,
  Text,
  Metric,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFoot,
  TableFooterCell,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tracker,
} from "@tremor/react";
import useWindowSize from "@/lib/hooks/use-window-size";
import Leaflet from "./modal/leaflet";
import { ShoppingCart } from "lucide-react";

interface Product {
  name: string;
  price: number;
  image: JSX.Element;
}

export default function ShoppingCartComponent() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    // Get the existing quote data from localStorage if available
    const savedProducts = window.localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : {};
  });
  const [eventDetails, setEventDetails] = useState(() => {
    // Get the existing event details from localStorage if available
    const savedEventDetails = window.localStorage.getItem("eventDetails");
    return savedEventDetails ? JSON.parse(savedEventDetails) : {};
  });
  console.log(selectedProducts);
  console.log(eventDetails);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const ConfirmAndSignContent = () => (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label htmlFor="terms">I accept the terms and conditions</label>
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <label
          htmlFor="signature"
          className="text-sm font-medium text-stone-500"
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
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // Implement payment processing logic here
        }}
        // Give each element some space
        className="flex flex-col space-y-2"
      >
        {/* Card Number Input */}
        <TextInput
          name="cardNumber"
          placeholder="Card Number"
          value={cardDetails.cardNumber}
          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
          required
        />

        {/* Card Holder Input */}
        <TextInput
          name="cardHolder"
          placeholder="Card Holder"
          value={cardDetails.cardHolder}
          onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
          required
        />

        {/* Expiry Date Input */}
        <TextInput
          name="expiryDate"
          placeholder="MM/YY"
          value={cardDetails.expiryDate}
          onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
          required
        />

        {/* CVV Input */}
        <NumberInput
          name="cvv"
          placeholder="CVV"
          value={cardDetails.cvv}
          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          required
        />

        {/* Submit Button */}
        <Button type="submit">Pay</Button>
      </form>
    </div>
  );
  const { isMobile, isDesktop } = useWindowSize();

  const totalCost = Object.values(selectedProducts).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const CartTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Item</TableHeaderCell>
          <TableHeaderCell>Quantity</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(selectedProducts).map(([product, details]) => (
          <TableRow key={product}>
            <TableCell>{product}</TableCell>
            <TableCell>{details.quantity}</TableCell>
            <TableCell>${details.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableFooterCell>Total</TableFooterCell>
          <TableFooterCell>${totalCost.toFixed(2)}</TableFooterCell>
        </TableRow>
      </TableFoot>
    </Table>
  );

  const CheckoutStepper = () => (
    <TabGroup onChange={handleTabChange} index={tabIndex}>
      <Tracker
        data={[
          { key: "Order", color: tabIndex >= 0 ? "green" : "gray" },
          { key: "Confirm and Sign", color: tabIndex >= 1 ? "green" : "gray" },
          { key: "Checkout", color: tabIndex >= 2 ? "green" : "gray" },
        ]}
        className="mb-2 mt-2 h-2"
      />
      <TabList className="flex flex-1 justify-between">
        <Tab>Order</Tab>
        <Tab>Confirm and Sign</Tab>
        <Tab>Checkout</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CartTable />
        </TabPanel>
        <TabPanel>
          <ConfirmAndSignContent />
        </TabPanel>
        <TabPanel>
          <CheckoutContent />
        </TabPanel>
      </TabPanels>
    </TabGroup>
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
              <div className="relative flex flex-col space-y-4 p-5 md:p-10">
                <h2 className="font-cal text-2xl dark:text-white">Cart</h2>
                <CheckoutStepper />
              </div>
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
