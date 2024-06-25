"use client";

import { IMovements, IWarehouse } from "@/declarations/model/warehouse";
import { createContext } from "react";

export interface PurchaseProps {
  warehouse: {
    warehouses: IWarehouse[];
    loading: boolean;
    selected: IWarehouse | null;
  };
  movement: {
    movements: IMovements[];
    loading: boolean;
  };
  loadingData: boolean;

  loadWarehouses: () => void;
  loadMovements: () => void;

  onSelectWarehouse: (warehouse: IWarehouse | null) => void;

  onCreateOrEditWarehouse: (
    type: "Edit" | "Create",
    id: string | null,
    warehouse: string | IWarehouse,
    onTerminate: () => void
  ) => void;

}
export const WarehouseContext = createContext({} as PurchaseProps);
