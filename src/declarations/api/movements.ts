import { InventoryMovementType, MeasurementUnit } from "../model";

export type CreateInventoryMovement = {
  materialOrProducts: MaterialOrProduct[];
  type: InventoryMovementType;
  reason: string;
  grocerId: string;
  conditions: string;
  warehouse: string;
}

export type UpdateInventoryMovement = {
  id: string;
  type: InventoryMovementType;
  amount: number;
  reason: string;
  productOrMaterialId: string;
  warehouse: string;
}

export type MaterialOrProduct = {
  id: string;
  amount: number;
  name: string;
  measurementUnit: MeasurementUnit
};
