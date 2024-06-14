
import { CarrierStatus } from "../model/carrier";

export type ICarrierTableCell = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  plateCode: string;
  userId: string;
  status: CarrierStatus;
}

export type ICarrierTableColumn = {
  key: keyof ICarrierTableCell | 'actions';
  title: string;
}