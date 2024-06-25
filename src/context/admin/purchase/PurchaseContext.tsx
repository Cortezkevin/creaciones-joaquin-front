"use client";

import { CreatePurchaseOrder, CreateRawMaterial, CreateSupplier, IPurchaseOrder, IPurchaseOrderReception, IRawMaterial, ISupplier, UpdateRawMaterial } from "@/declarations";
import { IWarehouse } from "@/declarations/model/warehouse";
import { createContext } from "react";

export interface PurchaseProps {
  supplier: {
    suppliers: ISupplier[];
    loading: boolean;
    selected: ISupplier | null;
  };
  rawMaterial: {
    rawMaterials: IRawMaterial[];
    loading: boolean;
    selected: IRawMaterial | null;
  };
  purchaseOrder: {
    purchaseOrders: IPurchaseOrder[];
    loading: boolean;
    selected: IPurchaseOrder | null;
  };
  loadingData: boolean;

  loadSuppliers: () => void;
  loadRawMaterials: () => void;
  loadPurchaseOrders: () => void;

  onSelectSupplier: (supplier: ISupplier | null) => void;
  onSelectRawMaterial: (supplier: IRawMaterial | null) => void;
  onSelectPurchaseOrder: (purchaseOrder: IPurchaseOrder | null) => void;

  onCreateOrEditSupplier: (
    type: "Edit" | "Create",
    id: string | null,
    supplier: CreateSupplier | ISupplier,
    onTerminate: () => void
  ) => void;

  onCreateOrEditRawMaterial: (
    type: "Edit" | "Create",
    id: string | null,
    rawMaterial: CreateRawMaterial | UpdateRawMaterial,
    onTerminate: () => void
  ) => void;

  onCreatePurchaseOrder: (purchaseOrder: CreatePurchaseOrder, onTerminate: () => void) => void;
}
export const PurchaseContext = createContext({} as PurchaseProps);
