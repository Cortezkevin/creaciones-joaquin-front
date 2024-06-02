"use client";

import { AddItem, ICartItem, RemoveItem } from '@/declarations';
import { createContext } from 'react';

export interface CartProps {
  id: string;
  items: ICartItem[];
  count: number;
  tax: string;
  shippingCost: string;
  discount: string;
  subtotal: string;
  total: string;
  loadingItems: boolean;
  isAddingItem: boolean;
  isRemovingItem: boolean;

  onAddItem: ( newItem: AddItem ) => void;
  onAddMemoryItem: ( newItem: ICartItem ) => void;
  onRemoveItem: ( itemToRemove: RemoveItem ) => void;
  onRemoveMemoryItem: ( removeItem: { productId: string, amount: number, removeAll: boolean } ) => void;
  onChangeShippingCost: ( cost: string ) => void;
  onChangeShippingCostMemory: ( cost: string) => void;
  onClear: () => void;
}
export const CartContext = createContext({} as CartProps);