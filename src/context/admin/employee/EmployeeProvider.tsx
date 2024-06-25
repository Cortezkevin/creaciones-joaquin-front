"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { EmployeeContext, EmployeeReducer } from "./";

import { carrierAPI, grocerAPI } from "@/api";
import toast from "react-hot-toast";
import { IGrocer } from "@/declarations/model/grocer";
import { ICarrier } from "@/declarations/model/carrier";
import { NewCarrier } from "@/declarations/api/carrier";
import { NewGrocer } from "@/declarations/api/grocer";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface EmployeeState {
  grocer: {
    grocers: IGrocer[];
    loading: boolean;
    selected: IGrocer | null;
  };
  carrier: {
    carriers: ICarrier[];
    loading: boolean;
    selected: ICarrier | null;
  };
  loadingData: boolean;
}

const Employee_INITIAL_STATE: EmployeeState = {
  carrier: {
    carriers: [],
    selected: null,
    loading: false
  },
  grocer: {
    grocers: [],
    selected: null,
    loading: false
  },
  loadingData: false,
};

export const EmployeeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EmployeeReducer, Employee_INITIAL_STATE);

  React.useEffect(() => {
    dispatch({
      type: "[Employee] - Loading",
      payload: true,
    });
    (async () => {
      await loadGrocers();
      await loadCarriers();
    })();
    dispatch({
      type: "[Employee] - Loading",
      payload: false,
    });
  }, []);

  const loadCarriers = async () => {
    const carriers = await carrierAPI.getAll();
    if (carriers?.success) {
      dispatch({
        type: "[Employee] - Load Carrier",
        payload: carriers?.content,
      });
    }
  }

  const loadGrocers = async () => {
    const grocers = await grocerAPI.getAll();
    if (grocers?.success) {
      dispatch({
        type: "[Employee] - Load Grocer",
        payload: grocers?.content,
      });
    }
  }

  const onSelectCarrier = (carrier: ICarrier | null) => {
    dispatch({
      type: "[Employee] - Select Carrier",
      payload: carrier,
    });
  };

  const onSelectGrocer = (grocer: IGrocer | null) => {
    dispatch({
      type: "[Employee] - Select Grocer",
      payload: grocer,
    });
  };

  const onCreateCarrier = async (
    carrier: NewCarrier,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Employee] - Saving Carrier",
    });
    const response = await carrierAPI.create( carrier );
    if (response?.success) {
      dispatch({
        type: "[Employee] - Carrier Created",
        payload: response.content,
      });
      toast.success(response.message);
      onTerminate();
      return;
    }
    toast.error(response!.message);
    onTerminate();
  };

  const onCreateGrocer = async (
    grocer: NewGrocer,
    onTerminate: () => void
  ) => {
    dispatch({
      type: "[Employee] - Saving Grocer",
    });
    const response = await grocerAPI.create( grocer );
    if (response?.success) {
      dispatch({
        type: "[Employee] - Grocer Created",
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
    <EmployeeContext.Provider
      value={{
        ...state,
        onSelectCarrier,
        onSelectGrocer,
        onCreateCarrier,
        onCreateGrocer,
        loadCarriers,
        loadGrocers,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};