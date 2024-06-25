export type MeasurementUnit = "PESO" | "VOLUMEN" | "CANTIDAD" | "LONGITUD";

export type IRawMaterial = {
  id: string;
  name: string;
  description: string;
  measurementUnit: MeasurementUnit;
  stock: string;
  unitPrice: string;
  supplier: string;
  supplierId: string;
}