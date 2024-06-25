import { MeasurementUnit } from "../model";

export type AcceptAndRejectPurchaseOrder = {
  acceptConditions: string;
  warehouseLocation: string;
  rejectReason: string;
  rejectConditions: string;
  suggestions: string;
  acceptedOrderDetailIds: string[];
}

export type NewPurchaseDetail = {
  name: string;
  materialOrProductId: string;
  amount: number;
  unitPrice: string;
  measurementUnit: MeasurementUnit;
  total: string;
}

export type CreatePurchaseOrder = {
  userId: string;
  supplierId: string;
  details: NewPurchaseDetail[];
}