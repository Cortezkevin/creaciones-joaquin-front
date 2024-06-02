import { ICollection } from "./collection";
import { ISubCategory } from "./subcategory";

export type IProduct = {
  id: string;
  name: string;
  description: string;
  subCategory: ISubCategory,
  collection?: ICollection,
  price: string;
  stock: number;
  images: string[];
}