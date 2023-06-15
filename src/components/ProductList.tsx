import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { products } from "../mock-data/product-data";
import { useCart } from "../shopping-cart/useCart";
import { Link } from "react-router-dom";

function ProductList() {
  const { getTotalQuantity, updateCartItems } = useCart();
  return (
    <div className="bg-white min-h-full">
      <header className={"bg-indigo-500 py-8 px-4 flex"}>
        <h1 className={"flex-1 text-3xl text-white text-center"}>
          Shop The Tees
        </h1>
        <Link to={"/cart"}>
          <div className={"flex justify-items-center gap-2 text-white"}>
            <span className={"mt-0.5"}>{getTotalQuantity()}</span>
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
              aria-hidden="true"
            />
          </div>
        </Link>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => updateCartItems(product, 1)}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ProductList };
