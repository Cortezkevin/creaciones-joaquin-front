export type PaymentMethod = "TARJETA" | "YAPE";
export type ShippingStatus = "EN_PREPARACION" | "ENVIADO" | "EN_TRANSITO" | "ENTREGADO";
export type OrderStatus = "PENDIENTE" | "COMPLETADO" | "EN_PROCESO" | "ANULADO";

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

export type IDetailedOrder = {
  id: string;
  subtotal: string;
  discount: string;
  shippingCost: string;
  tax: string;
  total: string;
  user: string;
  shippingAddress: string;
  createdDate: string;
  cancelledDate: string;
  completedDate: string;
  paymentMethod: PaymentMethod;
  shippingStatus: ShippingStatus;
  status: OrderStatus;
  orderDetails: IOrderDetail[];
  invoiceUrl: string;
}