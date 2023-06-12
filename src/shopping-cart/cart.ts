type Product = {
  price: number;
  name: string;
};

type productId = string;

type Offer = number;

type ProductCatalog = Map<productId, Product>;
type ProductOffers = Map<productId, Offer[]>;

type CartItem = Map<string, number>;

class ProductNotFound extends Error {}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

function createCart({
  productCatalogue,
  productOffers = new Map<string, Offer[]>(),
}: {
  productCatalogue: ProductCatalog;
  productOffers?: ProductOffers;
}) {
  const cartItems: CartItem = new Map();
  function addItem(productId: string, quantity: number) {
    const selectedItem = productCatalogue.get(productId);
    if (!selectedItem) {
      throw new ProductNotFound();
    }
    const currentQuantity = cartItems.get(productId) || 0;
    cartItems.set(productId, quantity + currentQuantity);
  }
  function getItems() {
    const products: Product[] = [];
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
  };
}

export type { ProductCatalog, Product, ProductOffers };
export { createCart };
