"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { AdminContext, AdminReducer } from "./";
import {
  ICategory,
  ICollection,
  IOrder,
  IOrderTableCell,
  IProduct,
  ISubCategory,
  IUser,
  NewCategory,
  NewCollection,
  NewProduct,
  NewSubCategory,
  UpdateCategory,
  UpdateCollection,
  UpdateOrder,
  UpdateProduct,
  UpdateSubCategory,
  UpdateUser,
} from "@/declarations";
import { categoryAPI, collectionAPI, orderAPI, productAPI, subcategoryAPI, userAPI } from "@/api";
import toast from "react-hot-toast";
import { IUsersTableCell } from "@/declarations/table/users";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface AdminState {
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
  order: {
    orders: IOrder[];
    loading: boolean;
    selected: IOrder | null;
  };
  loadingData: boolean;
}

const Admin_INITIAL_STATE: AdminState = {
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
  order: {
    orders: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const AdminProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, Admin_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Admin] - Loading",
      payload: true,
    });
    (async () => {
      const categories = await categoryAPI.getAll();
      if (categories?.success) {
        dispatch({
          type: "[Admin] - Load Categories",
          payload: categories?.content,
        });
      }
      const collections = await collectionAPI.getAll();
      if (collections?.success) {
        dispatch({
          type: "[Admin] - Load Collections",
          payload: collections?.content,
        });
      }
      const subcategories = await subcategoryAPI.getAll();
      if (subcategories?.success) {
        dispatch({
          type: "[Admin] - Load SubCategories",
          payload: subcategories?.content,
        });
      }
      const products = await productAPI.getAll();
      if (products?.success) {
        dispatch({
          type: "[Admin] - Load Products",
          payload: products?.content,
        });
      }
      const users = await userAPI.getUsers();
      if (users?.success) {
        dispatch({
          type: "[Admin] - Load Users",
          payload: users?.content,
        });
      }
      const orders = await orderAPI.getAllOrders();
      if (orders?.success) {
        dispatch({
          type: "[Admin] - Load Orders",
          payload: orders?.content,
        });
      }
    })();
    dispatch({
      type: "[Admin] - Loading",
      payload: false,
    });
  }, []);

  const onSelectCategory = (category: ICategory | null) => {
    dispatch({
      type: "[Admin] - Select Category",
      payload: category,
    });
  };

  const onSelectCollection = (collection: ICollection | null) => {
    dispatch({
      type: "[Admin] - Select Collection",
      payload: collection,
    });
  };

  const onSelectSubCategory = (subcategory: ISubCategory | null) => {
    dispatch({
      type: "[Admin] - Select SubCategory",
      payload: subcategory,
    });
  };

  const onSelectProduct = (product: IProduct | null) => {
    dispatch({
      type: "[Admin] - Select Product",
      payload: product,
    });
  };

  const onSelectUser = (user: IUsersTableCell | null) => {
    dispatch({
      type: "[Admin] - Select User",
      payload: user,
    });
  };

  const onSelectOrder = (order: IOrderTableCell | null) => {
    dispatch({
      type: "[Admin] - Select Order",
      payload: order,
    });
  };

  const onCreateOrEditCategory = async (
    type: "Edit" | "Create",
    id: string | null,
    category: NewCategory | UpdateCategory,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Admin] - Saving Category",
    });

    if (type === "Edit") {
      const response = await categoryAPI.update(
        id!,
        category.name,
        category.file
      );
      if (response?.success) {
        dispatch({
          type: "[Admin] - Category Updated",
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
          type: "[Admin] - Category Created",
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
      type: "[Admin] - Saving Category",
    });

    if (type === "Edit") {
      const response = await collectionAPI.update(
        collection as UpdateCollection,
        collection.file
      );
      if (response?.success) {
        dispatch({
          type: "[Admin] - Collection Updated",
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
          type: "[Admin] - Collection Created",
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
      type: "[Admin] - Saving SubCategory",
    });

    if( type === "Edit" ){
      const response = await subcategoryAPI.update(
        subcategory as UpdateSubCategory,
        subcategory.file
      );
      if (response?.success) {
        dispatch({
          type: "[Admin] - SubCategory Updated",
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
          type: "[Admin] - SubCategory Created",
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
      type: "[Admin] - Saving Product",
    });

    if( type === "Edit" ){
      const response = await productAPI.update(
        product as UpdateProduct/* ,
        product.files */
      );
      if (response?.success) {
        dispatch({
          type: "[Admin] - Product Updated",
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
          type: "[Admin] - Product Created",
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
      type: "[Admin] - Saving User",
    });
    const response = await userAPI.update( user );
    if (response?.success) {
      dispatch({
        type: "[Admin] - User Updated",
        payload: response.content,
      });
      toast.success(response.message);
      onTerminate();
      return;
    }
    toast.error(response!.message);
    onTerminate();
  };

  const onEditOrder = async (
    order: UpdateOrder,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Admin] - Saving Order",
    });
    const response = await orderAPI.update( order );
    if (response?.success) {
      dispatch({
        type: "[Admin] - Order Updated",
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
    <AdminContext.Provider
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
        onEditOrder,
        onSelectOrder
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};