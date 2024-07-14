import { IMinimalMovements, IOrder, IPurchaseOrder } from "../model";

export type IEntryGuide = {
  id: string;
  date: string;
  productConditions: string;
  grocer: string;
  purchaseOrderId: string;
  warehouse: string;
}

export type IDetailedEntryGuide = {
  id: string;
  date: string;
  productConditions: string;
  grocer: string;
  purchaseOrder?: IPurchaseOrder;
  movementsList: IMinimalMovements[];
  warehouse: string;
}

export type IExitGuide = {
  id: string;
  date: string;
  observations: string;
  grocer: string;
  order: string;
  warehouse: string;
}

export type IDetailedExitGuide = {
  id: string;
  date: string;
  observations: string;
  grocer: string;
  order?: IOrder;
  movementsList: IMinimalMovements[];
  warehouse: string;
}

export type IRejectionGuide = {
  id: string;
  date: string;
  reason: string;
  productConditions: string;
  suggestions: string;
  grocer: string;
  purchaseOrder: string;
}