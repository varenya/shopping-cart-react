import { createCart, Product, ProductCatalog, ProductOffers } from "./cart";
const product1: Product = { name: "Dove", price: 39.99 };
const product2: Product = { name: "Axe Soap", price: 99.99 };
const productCatalogue: ProductCatalog = new Map([
  ["1", product1],
  ["2", product2],
]);

const productOffers: ProductOffers = new Map([["1", [33.33]]]);

describe("shopping cart", () => {
  it("should initialize with 0 items", () => {
    const cart = createCart({ productCatalogue });
    expect([...cart]).toHaveLength(0);
  });
  it("should add item to cart", () => {
    const cart = createCart({ productCatalogue });
    cart.addItem("1", 5);
    expect(cart.getItems()).toHaveLength(1);
  });
  it("should give provide the total cost of cart", () => {
    const cart = createCart({ productCatalogue });
    cart.addItem("1", 5);
    expect(cart.getTotalCost()).toBe(199.95);
  });
  it("should update the cart when consequent products have been added", () => {
    const cart = createCart({ productCatalogue });
    cart.addItem("1", 5);
    cart.addItem("1", 3);
    expect(cart.getTotalCost()).toBe(319.92);
  });
  it("should add the tax rate if applicable", () => {
    const cart = createCart({ productCatalogue });
    cart.addItem("1", 2);
    cart.addItem("2", 2);
    expect(cart.getTax(12.5)).toBe(35.0);
    expect(cart.getTotalCost(12.5)).toBe(314.96);
  });
  it("should provide discount price properly for 'Buy 2 get 1' free offer", () => {
    const cart = createCart({ productOffers, productCatalogue });
    cart.addItem("1", 3);
    expect(cart.getTotalCost(12.5)).toBe(89.98);
    expect(cart.getTax(12.5)).toBe(10.0);
  });
});
