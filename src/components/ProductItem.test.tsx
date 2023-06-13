import React from "react";
import { ProductItem } from "./ProductItem";
import { render, screen } from "@testing-library/react";
import { products } from "../mock-data/product-data";

describe("ProductItem", () => {
  it("should render product item as expected", () => {
    render(<ProductItem product={products[0]} />);
    expect(screen.getByRole("link", { name: "Basic Tee" })).toBeInTheDocument();
  });
});
