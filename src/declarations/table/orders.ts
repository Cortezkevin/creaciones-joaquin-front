import { OrderStatus, PaymentMethod, PreparationStatus, ShippingStatus } from "../model";
import { ICarrier } from "../model/carrier";
import { IGrocer } from "../model/grocer";

export type IOrderTableCell = {
  id: string,
  total: string,
  user: string,
  shippingAddress: string,
  createdDate: string,
  cancelledDate: string,
  completedDate: string,
  paymentMethod: PaymentMethod,
  shippingStatus: ShippingStatus,
  preparationStatus: PreparationStatus,
  status: OrderStatus
}

export type IOrderTableColumn = {
  key: keyof IOrderTableCell | 'actions';
  title: string;
}

export type IPreparationOrderTableCell = {
  id: string;
  userIdFromGrocer: string;
  grocer: IGrocer;
  orderId: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  completedDate: string;
  orderStatus: OrderStatus;
  status: PreparationStatus;
}

export type IPreparationOrderTableColumn = {
  key: keyof IPreparationOrderTableCell | 'actions';
  title: string;
}

export type IShippingOrderTableCell = {
  id: string;
  userIdFromCarrier: string;
  orderId: string;
  carrier: ICarrier;
  preparedBy: string;
  address: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  shippingDate: string;
  completedDate: string;
  status: ShippingStatus;
}

export type IShippingOrderTableColumn = {
  key: keyof IShippingOrderTableCell | 'actions';
  title: string;
}