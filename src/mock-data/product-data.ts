import { ProductItem } from "../models/Product";
import { ProductCatalog } from "../shopping-cart/cart";

const products: ProductItem[] = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: 32,
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: 32,
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: 35,
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

const initialProductCatalogue: ProductCatalog<number, ProductItem> = new Map();

const productCatalogue = products.reduce((productMap, productItem) => {
  return productMap.set(productItem.id, productItem);
}, initialProductCatalogue);

export { products, productCatalogue };
