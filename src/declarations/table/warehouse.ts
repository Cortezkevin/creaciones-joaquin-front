import { InventoryMovementType } from "../model";

export type IWarehouseTableCell = {
  id: string;
  location: string;
}

export type IWarehouseTableColumn = {
  key: keyof IWarehouseTableCell | 'actions';
  title: string;
}

export type IMovementsTableCell = {
  id: string;
  type: InventoryMovementType;
  amount: number;
  date: string;
  productOrMaterial: string;
  warehouse: string;
}

export type IMovementsTableColumn = {
  key: keyof IMovementsTableCell | 'actions';
  title: string;
}