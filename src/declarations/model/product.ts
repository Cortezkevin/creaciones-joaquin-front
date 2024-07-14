import { ProductMaterial } from "../api";
import { ICollection } from "./collection";
import { ISubCategory } from "./subcategory";

export type IProduct = {
  id: string;
  name: string;
  description: string;
  subCategory: ISubCategory,
  collection?: ICollection,
  type: "COMPRADO" | "FABRICADO",
  supplier?: string;
  supplierId?: string;
  price: string;
  stock: number;
  images: string[];
  materials?: ProductMaterial[];
}