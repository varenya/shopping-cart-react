type ProductItem = {
  id: number;
  name: string;
  href: string;
  price: number;
  color: string;
  inStock: boolean;
  size?: string;
  imageSrc: string;
  imageAlt: string;
  leadTime?: string;
};

export type { ProductItem };
