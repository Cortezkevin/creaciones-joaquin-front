import { OrderStatus, PaymentMethod, ShippingStatus } from "../model";

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
  status: OrderStatus
}

export type IOrderTableColumn = {
  key: keyof IOrderTableCell | 'actions';
  title: string;
}