import { ICollection, ISubCategory } from "../model";

export type IProductTableCell = {
  id: string;
  name: string;
  description: string;
  subCategory: ISubCategory;
  collection?: ICollection;
  price: string;
  stock: number;
  images: string[];
}

export type IProductTableColumn = {
  key: keyof IProductTableCell | 'actions';
  title: string;
}