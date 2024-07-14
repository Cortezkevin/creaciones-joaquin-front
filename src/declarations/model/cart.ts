export type ICartItem = {
  id: string;
  product_id: string;
  name: string;
  description: string;
  stock: number;
  price: string;
  amount: number;
  total: string;
  image: string;
}

export type ICart = {
  id: string;
  cartItems: ICartItem[];
  tax: string;
  discount: string;
  subtotal: string;
  distance: number;
  shippingCost: string;
  total: string;
  user_id: string;
}