import { OrderStatus } from "./order";

export type ISalesByProduct = {
  product: string;
  amount: number;
}

export type ISalesByUser = {
  client: string;
  salesTotal: number;
}

export type ISalesByMonth = {
  month: number;
  sales: string;
}

export type IOrdersCountByStatus = { 
  status: OrderStatus,
  amount: number
}

export type IOrderDurationPerDistanceAVG = {
  distanceRange: string;
  avgDurationInDays: number;
}

export type ISalesDashboard = {
  products: number;
  categories: number;
  subcategories: number;
  users: number;
  orders: number;
  totalSales: string;
  avgDurationByDistanceRange: IOrderDurationPerDistanceAVG[];
  ordersCountByStatus: IOrdersCountByStatus[];
  topProductByYear: ISalesByProduct[];
  topUser: ISalesByUser[];
  salesByMonth: ISalesByMonth[];
}