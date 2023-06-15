import {
  createCart,
  InvalidArgumentException,
  Product,
  ProductCatalog,
  ProductNotFound,
  ProductOffers,
} from "./cart";
const product1: Product = { name: "Dove", price: 39.99 };
const product2: Product = { name: "Axe Soap", price: 99.99 };
const productCatalogue: ProductCatalog<string, Product> = new Map([
  ["1", product1],
  ["2", product2],
]);

const productOffers: ProductOffers<string> = new Map([["1", [33.33]]]);

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
  it("should increase the quantity if same item is added", () => {
    const cart = createCart({ productOffers, productCatalogue });
    cart.addItem("1", 3);
    cart.addItem("1", 3);
    expect(cart.getTotalQuantity()).toBe(6);
  });
  it("should remove item from the cart and quantity should be updated", () => {
    const cart = createCart({ productOffers, productCatalogue });
    cart.addItem("1", 3);
    cart.addItem("2", 3);
    cart.removeItem("1");
    expect(cart.getTotalQuantity()).toBe(3);
  });
  it("should have a method to return quantity for a specific product", () => {
    const cart = createCart({ productOffers, productCatalogue });
    cart.addItem("1", 3);
    cart.addItem("2", 2);
    expect(cart.getQuantity("1")).toBe(3);
    expect(cart.getQuantity("2")).toBe(2);
  });
  it("should throw an error if requested product is not found", () => {
    expect.assertions(1);
    const cart = createCart({ productOffers, productCatalogue });
    try {
      cart.getQuantity("3");
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFound);
    }
  });
  it("should not allow cart to add a negative or zero quantity item", () => {
    expect.assertions(1);
    const cart = createCart({ productOffers, productCatalogue });
    try {
      cart.addItem("1", -1);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentException);
    }
  });
  it("should not allow cart to add a product that doesn't exist", () => {
    expect.assertions(1);
    const cart = createCart({ productOffers, productCatalogue });
    try {
      cart.addItem("3", 4);
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFound);
    }
  });
});
