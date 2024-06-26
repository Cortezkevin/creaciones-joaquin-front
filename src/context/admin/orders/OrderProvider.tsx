"use client";

import React, { FC, ReactElement } from "react";
import { OrderContext, OrderReducer } from "./";
import {
  IOrder,
  IOrderTableCell,
  UpdateOrder,
} from "@/declarations";
import { orderAPI } from "@/api";
import toast from "react-hot-toast";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface OrderState {
  order: {
    orders: IOrder[];
    loading: boolean;
    selected: IOrder | null;
  };
  loadingData: boolean;
}

const ORDER_INITIAL_STATE: OrderState = {
  order: {
    orders: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const OrderProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(OrderReducer, ORDER_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Order] - Loading",
      payload: true,
    });
    (async () => {
      await loadOrders();
    })();
    dispatch({
      type: "[Order] - Loading",
      payload: false,
    });
  }, []);

  const loadOrders = async () => {
    const orders = await orderAPI.getAllOrders();
    if (orders?.success) {
      dispatch({
        type: "[Order] - Load Orders",
        payload: orders?.content,
      });
    }
  }

  const onSelectOrder = (order: IOrderTableCell | null) => {
    dispatch({
      type: "[Order] - Select Order",
      payload: order,
    });
  };

  const onEditOrder = async (
    order: UpdateOrder,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Order] - Saving Order",
    });
    const response = await orderAPI.update( order );
    if (response?.success) {
      dispatch({
        type: "[Order] - Order Updated",
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
    <OrderContext.Provider
      value={{
        ...state,
        onEditOrder,
        onSelectOrder,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};