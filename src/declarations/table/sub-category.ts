import { ICategory } from "../model";

export type ISubCategoryTableCell = {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  url_image: string;
}

export type ISubCategoryTableColumn = {
  key: keyof ISubCategoryTableCell | 'actions';
  title: string;
}