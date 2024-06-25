export type AddItem = {
  cart_id: string;
  product_id: string;
  amount: number;
}

export type RemoveItem = {
  cart_id: string;
  item_id: string;
  removeAll: boolean;
  amount: number;
}

export type MemoryCart = {
  itemList: MemoryItem[];
  shippingCost: string;
}

export type MemoryItem = {
  productId: string;
  amount: number;
}