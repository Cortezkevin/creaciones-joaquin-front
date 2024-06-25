export type IWarehouse = {
  id: string;
  location: string;
}

export type InventoryMovementType = "ENTRADA" | "SALIDA" | "PRODUCCION";

export type IMovements = {
  id: string;
  type: InventoryMovementType;
  amount: number;
  date: string;
  productOrMaterial: string;
  warehouse: string;
}