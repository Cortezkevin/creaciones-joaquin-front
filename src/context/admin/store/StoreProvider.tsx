"use client";

import React, { FC, ReactElement } from "react";
import { StoreContext, StoreReducer } from "./";
import {
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
import { categoryAPI, collectionAPI, productAPI, subcategoryAPI, userAPI } from "@/api";
import toast from "react-hot-toast";
import { IUsersTableCell } from "@/declarations/table/users";

interface Props {
  children: ReactElement | ReactElement[];
}

export interface StoreState {
  category: {
    categories: ICategory[];
    selected: ICategory | null;
    loading: boolean;
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
}

const STORE_INITIAL_STATE: StoreState = {
  category: {
    categories: [],
    selected: null,
    loading: false,
  },
  collection: {
    collections: [],
    selected: null,
    loading: false,
  },
  subcategory: {
    subcategories: [],
    selected: null,
    loading: false,
  },
  product: {
    products: [],
    selected: null,
    loading: false,
  },
  user: {
    users: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export function StoreProvider ({ children }: Props) {
  const [state, dispatch] = React.useReducer(StoreReducer, STORE_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Store] - Loading",
      payload: true
    });
    
    (async () => {
      const categories = await categoryAPI.getAll();
      if (categories?.success) {
        dispatch({
          type: "[Store] - Load Categories",
          payload: categories?.content,
        });
      }
      const collections = await collectionAPI.getAll();
      if (collections?.success) {
        dispatch({
          type: "[Store] - Load Collections",
          payload: collections?.content,
        });
      }
      const subcategories = await subcategoryAPI.getAll();
      if (subcategories?.success) {
        dispatch({
          type: "[Store] - Load SubCategories",
          payload: subcategories?.content,
        });
      }
      const products = await productAPI.getAll();
      if (products?.success) {
        dispatch({
          type: "[Store] - Load Products",
          payload: products?.content,
        });
      }
      await loadUsers();
    })();
    dispatch({
      type: "[Store] - Loading",
      payload: false,
    });
  }, []);

  const loadUsers = async () => {
    const users = await userAPI.getUsers();
    if (users?.success) {
      dispatch({
        type: "[Store] - Load Users",
        payload: users?.content,
      });
    }
  }

  const onSelectCategory = (category: ICategory | null) => {
    dispatch({
      type: "[Store] - Select Category",
      payload: category,
    });
  };

  const onSelectCollection = (collection: ICollection | null) => {
    dispatch({
      type: "[Store] - Select Collection",
      payload: collection,
    });
  };

  const onSelectSubCategory = (subcategory: ISubCategory | null) => {
    dispatch({
      type: "[Store] - Select SubCategory",
      payload: subcategory,
    });
  };

  const onSelectProduct = (product: IProduct | null) => {
    dispatch({
      type: "[Store] - Select Product",
      payload: product,
    });
  };

  const onSelectUser = (user: IUsersTableCell | null) => {
    dispatch({
      type: "[Store] - Select User",
      payload: user,
    });
  };

  const onCreateOrEditCategory = async (
    type: "Edit" | "Create",
    id: string | null,
    category: NewCategory | UpdateCategory,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving Category",
    });

    if (type === "Edit") {
      const response = await categoryAPI.update(
        id!,
        category.name,
        category.file
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - Category Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await categoryAPI.create(category.name, category.file!);
      if (response?.success) {
        dispatch({
          type: "[Store] - Category Created",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  };

  const onCreateOrEditCollection = async (
    type: "Edit" | "Create",
    collection: NewCollection | UpdateCollection,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving Category",
    });

    if (type === "Edit") {
      const response = await collectionAPI.update(
        collection as UpdateCollection,
        collection.file
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - Collection Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await collectionAPI.create(
        collection as NewCollection,
        collection.file!
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - Collection Created",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  };

  const onCreateOrEditSubCategory = async (
    type: "Edit" | "Create",
    subcategory: NewSubCategory | UpdateSubCategory,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving SubCategory",
    });

    if( type === "Edit" ){
      const response = await subcategoryAPI.update(
        subcategory as UpdateSubCategory,
        subcategory.file
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - SubCategory Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }else {
      const response = await subcategoryAPI.create(
        subcategory as NewSubCategory,
        subcategory.file!
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - SubCategory Created",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  }

  const onCreateOrEditProduct = async (
    type: "Edit" | "Create",
    product: NewProduct | UpdateProduct,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving Product",
    });

    if( type === "Edit" ){
      const response = await productAPI.update(
        product as UpdateProduct/* ,
        product.files */
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - Product Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }else {
      const response = await productAPI.create(
        product as NewProduct,
        product.files!
      );
      if (response?.success) {
        dispatch({
          type: "[Store] - Product Created",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  }

  const onEditUser = async (
    user: UpdateUser,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Store] - Saving User",
    });
    const response = await userAPI.update( user );
    if (response?.success) {
      dispatch({
        type: "[Store] - User Updated",
        payload: response.content,
      });
      toast.success(response.message);
      onTerminate();
      return;
    }
    toast.error(response!.message);
    onTerminate();
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        onSelectCategory,
        onSelectCollection,
        onSelectSubCategory,
        onSelectProduct,
        onCreateOrEditCategory,
        onCreateOrEditCollection,
        onCreateOrEditSubCategory,
        onCreateOrEditProduct,
        onEditUser,
        onSelectUser,
        loadUsers
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};