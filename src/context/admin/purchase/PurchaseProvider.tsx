"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { PurchaseContext, PurchaseReducer } from "./";

import { purchaseOrderAPI, rawMaterialAPI, supplierAPI } from "@/api";
import toast from "react-hot-toast";
import { CreatePurchaseOrder, CreateRawMaterial, CreateSupplier, IPurchaseOrder, IRawMaterial, ISupplier, UpdateRawMaterial } from "@/declarations";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface PurchaseState {
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
}

const Purchase_INITIAL_STATE: PurchaseState = {
  supplier: {
    suppliers: [],
    selected: null,
    loading: false
  },
  rawMaterial: {
    rawMaterials: [],
    selected: null,
    loading: false
  },
  purchaseOrder: {
    purchaseOrders: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const PurchaseProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(PurchaseReducer, Purchase_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Purchase] - Loading",
      payload: true,
    });
    (async () => {
      await loadPurchaseOrders();
      await loadRawMaterials();
      await loadSuppliers();
    })();
    dispatch({
      type: "[Purchase] - Loading",
      payload: false,
    });
  }, []);

  const loadSuppliers = async () => {
    const suppliers = await supplierAPI.getAll();
    if (suppliers?.success) {
      dispatch({
        type: "[Purchase] - Load Supplier",
        payload: suppliers?.content,
      });
    }
  }

  const loadRawMaterials = async () => {
    const rawMaterials = await rawMaterialAPI.getAll();
    if (rawMaterials?.success) {
      dispatch({
        type: "[Purchase] - Load RawMaterial",
        payload: rawMaterials?.content,
      });
    }
  }

  const loadPurchaseOrders = async () => {
    const purchaseOrders = await purchaseOrderAPI.getAll();
    if (purchaseOrders?.success) {
      dispatch({
        type: "[Purchase] - Load PurchaseOrder",
        payload: purchaseOrders?.content,
      });
    }
  }

  const onSelectSupplier = (supplier: ISupplier | null) => {
    dispatch({
      type: "[Purchase] - Select Supplier",
      payload: supplier,
    });
  };

  const onSelectRawMaterial = (rawMaterial: IRawMaterial | null) => {
    dispatch({
      type: "[Purchase] - Select RawMaterial",
      payload: rawMaterial,
    });
  };

  const onSelectPurchaseOrder = (purchaseOrder: IPurchaseOrder | null) => {
    dispatch({
      type: "[Purchase] - Select PurchaseOrder",
      payload: purchaseOrder,
    });
  };

  const onCreateOrEditSupplier = async (
    type: "Edit" | "Create",
    id: string | null,
    supplier: CreateSupplier | ISupplier,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving Supplier",
    });

    if (type === "Edit" && id ) {
      const response = await supplierAPI.update({ ...supplier, id });
      if (response?.success) {
        dispatch({
          type: "[Purchase] - Supplier Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await supplierAPI.create(supplier);
      if (response?.success) {
        dispatch({
          type: "[Purchase] - Supplier Created",
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

  const onCreateOrEditRawMaterial = async (
    type: "Edit" | "Create",
    id: string | null,
    rawMaterial: CreateRawMaterial | UpdateRawMaterial,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving RawMaterial",
    });

    if (type === "Edit" && id ) {
      const response = await rawMaterialAPI.update({ ...rawMaterial, id });
      if (response?.success) {
        dispatch({
          type: "[Purchase] - RawMaterial Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await rawMaterialAPI.create(rawMaterial);
      if (response?.success) {
        dispatch({
          type: "[Purchase] - RawMaterial Created",
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

  const onCreatePurchaseOrder = async (
    purchaseOrder: CreatePurchaseOrder,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Purchase] - Saving PurchaseOrder",
    });
    const response = await purchaseOrderAPI.create( purchaseOrder );
    if (response?.success) {
      dispatch({
        type: "[Purchase] - PurchaseOrder Created",
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
    <PurchaseContext.Provider
      value={{
        ...state,
        onSelectSupplier,
        onSelectRawMaterial,
        onSelectPurchaseOrder,
        onCreateOrEditSupplier,
        onCreateOrEditRawMaterial,
        onCreatePurchaseOrder,
        loadSuppliers,
        loadRawMaterials,
        loadPurchaseOrders,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};