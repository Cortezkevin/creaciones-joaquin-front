import { MeasurementUnit } from "../model";

export type IRawMaterialTableCell = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  stock: number;
  unitPrice: string;
  supplier: string;
  supplierId: string;
}

export type IRawMaterialTableColumn = {
  key: keyof IRawMaterialTableCell | 'actions';
  title: string;
}