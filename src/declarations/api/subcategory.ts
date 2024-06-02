export type NewSubCategory = {
  name: string;
  description: string;
  category_id: string;
  file: File;
}

export type UpdateSubCategory = {
  id: string;
  newName: string;
  newDescription: string;
  newCategoryId: string;
  file?: File;
}