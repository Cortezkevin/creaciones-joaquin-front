import { MeasurementUnit } from "../model";

export type CreateRawMaterial = {
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  unitPrice: string;
  supplierId: string;
}

export type UpdateRawMaterial = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  unitPrice: string;
  supplierId: string;
}