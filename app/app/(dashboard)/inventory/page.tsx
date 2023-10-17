'use client';
import { useState } from "react";
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Button,
} from "@tremor/react";
import CreateProductButton from "@/components/create-product-button";
import CreateProductModal from "@/components/modal/create-product";

// Replace this with your actual data
const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 10,
    quantity: 2,
    available: 1,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 15,
    quantity: 1,
    available: 1,
  },
  // Add more products as needed
];

export default function InventoryPage() {
  const handleAddProduct = () => {
    // Implement your logic to add a new product
  };

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Inventory
          </h1>
          <CreateProductButton>
            <CreateProductModal />
          </CreateProductButton>
        </div>
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Quantity</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}