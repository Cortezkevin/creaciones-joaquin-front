export type MeasurementUnit = "PESO" | "VOLUMEN" | "CANTIDAD" | "LONGITUD";

export type IRawMaterial = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  stock: number;
  unitPrice: string;
  supplier: string;
  supplierId: string;
}