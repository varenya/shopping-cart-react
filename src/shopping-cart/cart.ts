type Product = {
  price: number;
  name: string;
};

type ProductId<T> = T;

type Offer = number;

type ProductCatalog<ProductIdType, ProductType> = Map<
  ProductId<ProductIdType>,
  ProductType
>;
type ProductOffers<ProductIdType> = Map<ProductId<ProductIdType>, Offer[]>;

type CartItem<ProductType> = Map<ProductType, number>;

class ProductNotFound extends Error {}

class InvalidArgumentException extends Error {}

function createCart<ProductIdType, ProductType extends Product>({
  productCatalogue,
  productOffers = new Map<ProductIdType, Offer[]>(),
}: {
  productCatalogue: ProductCatalog<ProductIdType, ProductType>;
  productOffers?: ProductOffers<ProductIdType>;
}) {
  const cartItems: CartItem<ProductIdType> = new Map();
  function addItem(productId: ProductIdType, quantity: number) {
    const selectedItem = productCatalogue.get(productId);
    if (quantity <= 0) {
      throw new InvalidArgumentException();
    }
    if (!selectedItem) {
      throw new ProductNotFound();
    }
    const currentQuantity = cartItems.get(productId) || 0;
    cartItems.set(productId, quantity + currentQuantity);
  }
  function getTotalQuantity() {
    let quantity = 0;
    for (let [_item, itemQuantity] of cartItems) {
      quantity += itemQuantity;
    }
    return quantity;
  }

  function getQuantity(productId: ProductIdType) {
    if (!cartItems.has(productId)) {
      throw new ProductNotFound();
    }
    return cartItems.get(productId);
  }

  function removeItem(productId: ProductIdType) {
    if (!productCatalogue.has(productId)) throw new ProductNotFound();
    cartItems.delete(productId);
  }

  function getItems() {
    const products: ProductType[] = [];
    for (let productId of cartItems.keys()) {
      const product = productCatalogue.get(productId);
      if (product) {
        products.push(product);
      }
    }
    return products;
  }

  function getTax(taxRate = 0, cost = getCost()) {
    return Math.round((taxRate * cost) / 100);
  }

  function applyOffers(currentCost: number, offers: number[]) {
    return offers.reduce((acc, curr) => {
      return acc - (acc * curr) / 100;
    }, currentCost);
  }
  function getCost() {
    let cost = 0;
    for (let [id, quantity] of cartItems) {
      const currentProduct = productCatalogue.get(id);
      const offers = productOffers.get(id) || [];
      if (currentProduct) {
        const currentCost = currentProduct.price * quantity;
        const postOfferCost = applyOffers(currentCost, offers);
        cost += postOfferCost;
      }
    }
    return cost;
  }

  function getTotalCost(taxRate = 0) {
    const cost = getCost();
    const tax = getTax(taxRate, cost);
    const finalCost = cost + tax;
    return parseFloat(finalCost.toFixed(2));
  }

  function* iterator() {
    const items = getItems();
    for (let i = 0; i < items.length; i++) {
      yield items[i];
    }
  }

  return {
    [Symbol.iterator]: iterator,
    addItem,
    getItems,
    getTax,
    getTotalCost,
    getCost,
    getTotalQuantity,
    getQuantity,
    removeItem,
  };
}

export type { ProductCatalog, Product, ProductOffers };
export { createCart, InvalidArgumentException, ProductNotFound };
