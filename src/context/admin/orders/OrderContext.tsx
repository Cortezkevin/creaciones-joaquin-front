"use client";

import {
  IOrder,
  IOrderTableCell,
} from "@/declarations";
import { createContext } from "react";

export interface OrderProps {
  order: {
    orders: IOrder[];
    loading: boolean;
    selected: IOrder | null;
  };
  loadingData: boolean;
  loadOrders: () => void;
  onSelectOrder: (order: IOrderTableCell | null) => void;
/*   onEditOrder: (order: UpdateOrder, onTerminate: () => void) => void; */
}
export const OrderContext = createContext({} as OrderProps);
