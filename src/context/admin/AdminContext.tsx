"use client";

import { ICategory, ICollection, IOrder, IOrderTableCell, IProduct, ISubCategory, IUser, NewCategory, NewCollection, NewProduct, NewSubCategory, UpdateCategory, UpdateCollection, UpdateOrder, UpdateProduct, UpdateSubCategory, UpdateUser } from '@/declarations';
import { IUsersTableCell } from '@/declarations/table/users';
import { createContext } from 'react';

export interface AdminProps {
  category: {
    categories: ICategory[],
    loading: boolean,
    selected: ICategory | null
  },
  collection: {
    collections: ICollection[],
    loading: boolean,
    selected: ICollection | null
  },
  subcategory: {
    subcategories: ISubCategory[],
    loading: boolean,
    selected: ISubCategory | null
  },
  product: {
    products: IProduct[],
    loading: boolean,
    selected: IProduct | null
  },
  user: {
    users: IUser[],
    loading: boolean,
    selected: IUser | null
  },
  order: {
    orders: IOrder[],
    loading: boolean,
    selected: IOrder | null
  },
  loadingData: boolean

  onSelectCategory: (category: ICategory | null) => void;
  onSelectCollection: (collection: ICollection | null) => void;
  onSelectSubCategory: (subCategory: ISubCategory | null) => void;
  onSelectProduct: (product: IProduct | null) => void;
  onSelectUser: (user: IUsersTableCell | null) => void;
  onSelectOrder: (order: IOrderTableCell | null) => void;

  onCreateOrEditCategory: (type: 'Edit' | 'Create', id: string | null, category: NewCategory | UpdateCategory, onTerminate: () => void) => void;
  onCreateOrEditCollection: (type: 'Edit' | 'Create', collection: NewCollection | UpdateCollection, onTerminate: () => void) => void;
  onCreateOrEditSubCategory: (type: 'Edit' | 'Create', collection: NewSubCategory | UpdateSubCategory, onTerminate: () => void) => void;
  onCreateOrEditProduct: (type: 'Edit' | 'Create', product: NewProduct | UpdateProduct, onTerminate: () => void) => void;
  onEditOrder: (order: UpdateOrder, onTerminate: () => void) => void;
  onEditUser: (user: UpdateUser, onTerminate: () => void) => void;
}
export const AdminContext = createContext({} as AdminProps);