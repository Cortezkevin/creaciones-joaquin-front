"use client";

import { CreateInventoryMovement, IEntryGuide, IRejectionGuide, UpdateInventoryMovement } from "@/declarations";
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
    selected: IMovements | null;
  };
  /* entryGuide: {
    entryGuides: IEntryGuide[];
  };
  exitGuide: {
    exitGuides: IEntryGuide[];
  };
  rejectionGuide: {
    rejectionGuides: IRejectionGuide[];
  }; */
  loadingData: boolean;

  loadWarehouses: () => void;
  loadMovements: () => void;
  /* loadEntryGuides: () => void;
  loadExitGuides: () => void;
  loadRejectionGuides: () => void; */

  onSelectWarehouse: (warehouse: IWarehouse | null) => void;
  onSelectMovement: (movement: IMovements | null) => void;

  onCreateOrEditMovement: (
    type: "Edit" | "Create",
    id: string | null,
    movement: CreateInventoryMovement | UpdateInventoryMovement,
    onTerminate: () => void
  ) => void;

  onCreateOrEditWarehouse: (
    type: "Edit" | "Create",
    id: string | null,
    warehouse: string | IWarehouse,
    onTerminate: () => void
  ) => void;

}
export const WarehouseContext = createContext({} as PurchaseProps);
