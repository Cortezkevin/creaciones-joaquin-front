type Category = {
  id: string;
  name: string;
  url_image: string;
  subCategories: SubCategory[];
}

type SubCategory = {
  id: string;
  name: string;
  description: string;
  url_image: string;
  products: Product[];
  collection?: Collection[];
}

type Collection = {
  id: string;
  name: string;
  url_image: string;
  products: Product[];
}

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImages[];
}

type ProductImages = {
  id: string;
  url_image: string;
}

export { Category, Collection, Product, ProductImages, SubCategory };