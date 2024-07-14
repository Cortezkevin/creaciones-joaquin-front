import { IGrocer } from "./grocer";
import { IProduct } from "./product";
import { IRawMaterial, MeasurementUnit } from "./rawMaterial";

export type IWarehouse = {
  id: string;
  location: string;
}

export type InventoryMovementType = "ENTRADA" | "SALIDA" | "PRODUCCION";

export type IMovements = {
  id: string;
  type: InventoryMovementType;
  grocer: string;
  initialStock: number;
  amount: number;
  newStock: number;
  date: string;
  reason: string;
  productOrMaterial: string;
  warehouse: string;
}

export type IDetailedMovements = {
  id: string;
  type: InventoryMovementType;
  grocer: IGrocer;
  initialStock: number;
  amount: number;
  newStock: number;
  date: string;
  reason: string;
  rawMaterial?: IRawMaterial;
  productDTO?: IProduct;
  warehouse: string;
  guide: string;
}

export type IMinimalMovements = {
  id: string;
  unitType: MeasurementUnit;
  amount: number;
  date: string;
  productOrMaterial: string;
}