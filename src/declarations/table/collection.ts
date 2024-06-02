import { ICategory } from "../model";

export type ICollectionTableCell = {
  id: string;
  name: string;
  category: ICategory;
  url_image: string;
}

export type ICollectionTableColumn = {
  key: keyof ICollectionTableCell | 'actions';
  title: string;
}