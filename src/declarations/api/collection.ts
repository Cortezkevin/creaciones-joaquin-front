export type NewCollection = {
  name: string;
  category_id: string;
  file: File
}

export type UpdateCollection = {
  id: string;
  newName: string;
  newCategoryId: string;
  file?: File
}