import { IGrocer } from "./grocer";
import { MeasurementUnit } from "./rawMaterial";
import { ISupplier } from "./supplier";

export type PurchaseOrderStatus = "PENDIENTE" | "RECIBIDA" | "CANCELADA" | "EN_REVISION" | "COMPLETADA";
export type PurchaseOrderDetailStatus = "ACEPTADO" | "RECHAZADO" | "NO_RECEPCIONADO";

export type IPurchaseOrder = {
  id: string;
  date: string;
  status: PurchaseOrderStatus;
  total: string;
  requester: string;
  supplier: string;
  purchaseOrderReceptionId: string;
  supplierId: string;
  userId: string;
  guide: string;
}

export type IPurchaseOrderDetail = {
  id: string;
  name: string;
  amount: number;
  unitPrice: string;
  measurementUnit: MeasurementUnit;
  status?: PurchaseOrderDetailStatus;
  total: string;
}

export type IDetailedPurchaseOrder = {
  id: string;
  date: string;
  status: PurchaseOrderStatus;
  total: string;
  requester: string;
  supplier: ISupplier;
  orderDetails: IPurchaseOrderDetail[];
  userId: string;
  guide: string;
}

export type PurchaseOrderReceptionStatus = "PENDIENTE" | "RECIBIDO" | "EN_REVISION" | "ACEPTADO" | "RECHAZADO" | "COMPLETADO"

export type IPurchaseOrderReception = {
  id: string;
  observations: string;
  createdDate: string;
  startDate: string;
  reviewDate: string;
  completedDate: string;
  purchaseOrderStatus: PurchaseOrderStatus;
  status: PurchaseOrderReceptionStatus;
  purchaseOrderId: string;
  grocer: string;
  grocerId: string;
}

export type IDetailedPurchaseOrderReception = {
  id: string;
  observations: string;
  createdDate: string;
  startDate: string;
  reviewDate: string;
  completedDate: string;
  status: PurchaseOrderReceptionStatus;
  supplier: ISupplier;
  grocer: IGrocer;
  purchaseOrderDetails: IPurchaseOrderDetail[];
}