"use client";

import { NewCarrier } from "@/declarations/api/carrier";
import { NewGrocer } from "@/declarations/api/grocer";
import { ICarrier } from "@/declarations/model/carrier";
import { IGrocer } from "@/declarations/model/grocer";
import { createContext } from "react";

export interface EmployeeProps {
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

  loadCarriers: () => void;
  loadGrocers: () => void;

  onSelectCarrier: (carrier: ICarrier | null) => void;
  onSelectGrocer: (grocer: IGrocer | null) => void;

  onCreateGrocer: (grocer: NewGrocer, onTerminate: () => void) => void;
  onCreateCarrier: (carrier: NewCarrier, onTerminate: () => void) => void;
}
export const EmployeeContext = createContext({} as EmployeeProps);
