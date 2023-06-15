import { createCart } from "./cart";
import { ProductItem } from "../models/Product";
import { productCatalogue } from "../mock-data/product-data";
import { useState } from "react";

const cart = createCart<number, ProductItem>({
  productCatalogue: productCatalogue,
});

function useCart() {
  const [cartItems, setCartItems] = useState(cart.getItems());

  function updateCartItems(item: ProductItem, quantity: number) {
    cart.addItem(item.id, quantity);
    setCartItems(cart.getItems());
  }

  function deleteCartItem(item: ProductItem) {
    cart.removeItem(item.id);
    setCartItems(cart.getItems());
  }

  function getQuantity(item: ProductItem) {
    return cart.getQuantity(item.id);
  }

  return {
    cartItems,
    updateCartItems,
    deleteCartItem,
    getQuantity,
    getTotalQuantity: cart.getTotalQuantity,
    getTotal: cart.getTotalCost,
    getTax: cart.getTax,
    getCost: cart.getCost,
  };
}

export { useCart };
