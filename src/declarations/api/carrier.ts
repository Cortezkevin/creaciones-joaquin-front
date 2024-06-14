import { CarrierStatus } from "../model/carrier";

export type NewCarrier = {
  userId: string;
  plateCode: string;
  status: CarrierStatus;
}