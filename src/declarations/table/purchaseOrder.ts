import { PurchaseOrderReceptionStatus, PurchaseOrderStatus } from "../model";

export type IPurchaseOrderTableCell = {
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

export type IPurchaseOrderTableColumn = {
  key: keyof IPurchaseOrderTableCell | 'actions';
  title: string;
}

export type IPurchaseOrderReceptionTableCell = {
  id: string;
  observations: string;
  createdDate: string;
  startDate: string;
  reviewDate: string;
  completedDate: string;
  purchaseOrderStatus: PurchaseOrderStatus;
  status: PurchaseOrderReceptionStatus;
  grocer: string;
  purchaseOrderId: string;
  grocerId: string;
}

export type IPurchaseOrderReceptionTableColumn = {
  key: keyof IPurchaseOrderReceptionTableCell | 'actions';
  title: string;
}