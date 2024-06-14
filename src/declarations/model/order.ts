import { ICarrier } from "./carrier";
import { IGrocer } from "./grocer";

export type PaymentMethod = "TARJETA" | "YAPE";
export type ShippingStatus = "PENDIENTE" | "EN_PREPARACION" | "PREPARADO" | "EN_TRANSITO" | "ENTREGADO";
export type PreparationStatus = "PENDIENTE" | "EN_PREPARACION" | "EN_EMPAQUETADO" | "LISTO_PARA_RECOGER";
export type OrderStatus = "PENDIENTE" | "EN_PROCESO" | "PREPARADO" | "ENVIADO" | "ENTREGADO" | "ANULADO";

export type IOrder = {
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

export type IOrderDetail = {
  id: string,
  image: string,
  name: string,
  price: string,
  amount: number,
  total: string
}

export type IUserOrder = {
  fullName: string;
  email: string;
  phone: string;
}

export type IDetailedOrder = {
  id: string;
  note: string;
  subtotal: string;
  discount: string;
  shippingCost: string;
  tax: string;
  total: string;
  user: IUserOrder;
  shippingAddress: string;
  specificAddress: string;
  createdDate: string;
  cancelledDate: string;
  completedDate: string;
  paymentMethod: PaymentMethod;
  preparation: IPreparationOrder,
  shipping: IShippingOrder,
  status: OrderStatus;
  orderDetails: IOrderDetail[];
  invoiceUrl: string;
}

export type IShippingOrder = {
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

export type IPreparationOrder = {
  id: string;
  userIdFromGrocer: string;
  grocer: IGrocer;
  orderId: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  completedDate: string;
  status: PreparationStatus;
}

export type IDetailedPreparationOrder = {
  id: string;
  order: IDetailedOrder;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  completedDate: string;
  status: PreparationStatus;
}

export type IDetailedShippingOrder = {
  id: string;
  order: IDetailedOrder;
  preparedBy: string;
  createdDate: string;
  startDate: string;
  preparedDate: string;
  shippingDate: string;
  completedDate: string;
  status: ShippingStatus;
}