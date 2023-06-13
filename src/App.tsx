import React from "react";
import { ShoppingCart } from "./components/ShoppingCart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductList } from "./components/ProductList";

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
