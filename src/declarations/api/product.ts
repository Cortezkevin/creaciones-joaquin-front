export type NewProduct = {
  name: string;
  description: string;
  price: string;
  stock: number;
  subcategory_id: string;
  files: File[];
}

export type UpdateProduct = {
  id: string;
  newName: string;
  newDescription: string;
  newPrice: string;
  newStock: number;
  newSubCategoryId: string;
  newCollectionId: string;
  files?: File[];
}