type Category = {
  id: number;
  name: string;
  url_image: string;
}

type SubCategory = {
  id: number;
  name: string;
  description: string;
  url_image: string;
  id_category: number;
}

type Collection = {
  id: number;
  name: string;
  url_image: string;
  id_category: number;
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  id_category: number;
  id_collection?: number;
}

type ProductImages = {
  id: number;
  url_image: string;
  id_product: number;
}