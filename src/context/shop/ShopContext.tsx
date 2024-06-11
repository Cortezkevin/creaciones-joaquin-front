"use client";

import { ICategory, IProduct } from '@/declarations';
import { createContext } from 'react';

export interface ShopProps {
  products: {
    loading: boolean;
    data: IProduct[];
  };
  categories: {
    loading: boolean;
    data: ICategory[];
  };

  loadProducts: () => void;
  loadCategories: () => void;
}
export const ShopContext = createContext({} as ShopProps);