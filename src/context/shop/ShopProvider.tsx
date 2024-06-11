"use client";

import { ReactElement, useEffect, useReducer } from "react";
import { ShopContext, ShopReducer } from "./";
import { ICategory, IProduct } from "@/declarations";
import { categoryAPI, productAPI } from "@/api";
import toast from "react-hot-toast";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface ShopState {
  products: {
    loading: boolean;
    data: IProduct[];
  };
  categories: {
    loading: boolean;
    data: ICategory[];
  };
}

const Shop_INITIAL_STATE: ShopState = {
  products: {
    loading: false,
    data: [],
  },
  categories: {
    loading: false,
    data: [],
  },
};

export default function ShopProvider({ children }: Props) {
  const [state, dispatch] = useReducer(ShopReducer, Shop_INITIAL_STATE);

  useEffect(() => {
    handleLoadCategories();
    handleLoadProducts();
  },[]);

  const handleLoadProducts = async () => {
    dispatch({
      type: "[Shop] - Loading Products",
      payload: true
    });
    const response = await productAPI.getAll();
    if( response?.success ){
      dispatch({
        type: "[Shop] - Products Loaded",
        payload: response.content
      });
    }else {
      dispatch({
        type: "[Shop] - Loading Products",
        payload: false
      });
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  const handleLoadCategories = async () => {
    dispatch({
      type: "[Shop] - Loading Categories",
      payload: true
    });
    const response = await categoryAPI.getAll();
    if( response?.success ){
      dispatch({
        type: "[Shop] - Categories Loaded",
        payload: response.content
      });
    }else {
      dispatch({
        type: "[Shop] - Loading Categories",
        payload: false
      });
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        loadCategories: handleLoadCategories,
        loadProducts: handleLoadProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
