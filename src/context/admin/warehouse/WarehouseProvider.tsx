"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { WarehouseContext, WarehouseReducer } from "./";

import {  movementsAPI, warehouseAPI } from "@/api";
import toast from "react-hot-toast";
import { IMovements, IWarehouse } from "@/declarations/model/warehouse";
import { CreateInventoryMovement, UpdateInventoryMovement } from "@/declarations";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface WarehouseState {
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
  loadingData: boolean;
}

const Warehouse_INITIAL_STATE: WarehouseState = {
  warehouse: {
    warehouses: [],
    selected: null,
    loading: false
  },
  movement: {
    movements: [],
    loading: false,
    selected: null
  },
  loadingData: false,
};

export const WarehouseProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(WarehouseReducer, Warehouse_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Warehouse] - Loading",
      payload: true,
    });
    (async () => {
      await loadWarehouses();
      await loadMovements();
    })();
    dispatch({
      type: "[Warehouse] - Loading",
      payload: false,
    });
  }, []);

  const loadWarehouses = async () => {
    const warehouses = await warehouseAPI.getAll();
    if (warehouses?.success) {
      dispatch({
        type: "[Warehouse] - Load Warehouse",
        payload: warehouses?.content,
      });
    }
  }

  const loadMovements = async () => {
    const movements = await movementsAPI.getAll();
    if (movements?.success) {
      dispatch({
        type: "[Warehouse] - Load Movements",
        payload: movements?.content,
      });
    }
  }

  const onSelectWarehouse = (warehouse: IWarehouse | null) => {
    dispatch({
      type: "[Warehouse] - Select Warehouse",
      payload: warehouse,
    });
  };

  const onSelectMovement = (movement: IMovements | null) => {
    dispatch({
      type: "[Warehouse] - Select Movement",
      payload: movement,
    });
  };

  const onCreateOrEditWarehouse = async (
    type: "Edit" | "Create",
    id: string | null,
    warehouse: string | IWarehouse,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Warehouse] - Saving Warehouse",
    });

    if (type === "Edit" && id ) {
      const response = await warehouseAPI.update({...warehouse as IWarehouse, id});
      if (response?.success) {
        dispatch({
          type: "[Warehouse] - Warehouse Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await warehouseAPI.create(warehouse as string);
      if (response?.success) {
        dispatch({
          type: "[Warehouse] - Warehouse Created",
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

  const onCreateOrEditMovement = async (
    type: "Edit" | "Create",
    id: string | null,
    movement: CreateInventoryMovement | UpdateInventoryMovement,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Warehouse] - Saving Movement",
    });

    if (type === "Edit" && id ) {
      const response = await movementsAPI.update({...movement as UpdateInventoryMovement, id});
      if (response?.success) {
        dispatch({
          type: "[Warehouse] - Movement Updated",
          payload: response.content,
        });
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    } else {
      const response = await movementsAPI.create(movement as CreateInventoryMovement);
      if (response?.success) {
        (response.content as IMovements[]).forEach( i => {
          dispatch({
            type: "[Warehouse] - Movement Created",
            payload: i,
          });
        })
/*         dispatch({
          type: "[Warehouse] - Movement Created",
          payload: response.content,
        }); */
        toast.success(response.message);
        onTerminate();
        return;
      }
      toast.error(response!.message);
    }
    onTerminate();
  };


  return (
    <WarehouseContext.Provider
      value={{
        ...state,
        onSelectWarehouse,
        onSelectMovement,
        onCreateOrEditWarehouse,
        onCreateOrEditMovement,
        loadWarehouses,
        loadMovements
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};