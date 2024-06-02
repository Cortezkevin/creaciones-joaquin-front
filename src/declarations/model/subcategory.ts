import { ICategory } from "./category";

export type ISubCategory = {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  url_image: string;
}