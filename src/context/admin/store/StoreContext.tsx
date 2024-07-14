"use client";

import {
  CreateUser,
  ICategory,
  ICollection,
  IProduct,
  ISubCategory,
  IUser,
  NewCategory,
  NewCollection,
  NewProduct,
  NewSubCategory,
  UpdateCategory,
  UpdateCollection,
  UpdateProduct,
  UpdateSubCategory,
  UpdateUser,
} from "@/declarations";
import { IUsersTableCell } from "@/declarations/table/users";
import { createContext } from "react";

export interface StoreProps {
  category: {
    categories: ICategory[];
    loading: boolean;
    selected: ICategory | null;
  };
  collection: {
    collections: ICollection[];
    loading: boolean;
    selected: ICollection | null;
  };
  subcategory: {
    subcategories: ISubCategory[];
    loading: boolean;
    selected: ISubCategory | null;
  };
  product: {
    products: IProduct[];
    loading: boolean;
    selected: IProduct | null;
  };
  user: {
    users: IUser[];
    loading: boolean;
    selected: IUser | null;
  };

  loadingData: boolean;

  loadUsers: () => void;

  onSelectCategory: (category: ICategory | null) => void;
  onSelectCollection: (collection: ICollection | null) => void;
  onSelectSubCategory: (subCategory: ISubCategory | null) => void;
  onSelectProduct: (product: IProduct | null) => void;
  onSelectUser: (user: IUsersTableCell | null) => void;

  onCreateOrEditCategory: (
    type: "Edit" | "Create",
    id: string | null,
    category: NewCategory | UpdateCategory,
    onTerminate: () => void
  ) => void;

  onCreateOrEditCollection: (
    type: "Edit" | "Create",
    collection: NewCollection | UpdateCollection,
    onTerminate: () => void
  ) => void;

  onCreateOrEditSubCategory: (
    type: "Edit" | "Create",
    collection: NewSubCategory | UpdateSubCategory,
    onTerminate: () => void
  ) => void;

  onCreateOrEditProduct: (
    type: "Edit" | "Create",
    product: NewProduct | UpdateProduct,
    onTerminate: () => void
  ) => void;

  onCreateOrEditUser: (
    type: "Edit" | "Create",
    user: CreateUser | UpdateUser,
    onTerminate: () => void
  ) => void;
}
export const StoreContext = createContext({} as StoreProps);
