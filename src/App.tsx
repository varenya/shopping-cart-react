import React, { useState } from "react";
import { ShoppingCart } from "./components/ShoppingCart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { createCart } from "./shopping-cart/cart";
import { ProductItem } from "./models/Product";
import { productCatalogue, products } from "./mock-data/product-data";

const router = createBrowserRouter([
  { path: "/", element: <ProductList /> },
  { path: "/cart", element: <ShoppingCart /> },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
