import { ICategory } from "./category";

export type ICollection = {
  id: string;
  name: string;
  category: ICategory;
  url_image: string;
}