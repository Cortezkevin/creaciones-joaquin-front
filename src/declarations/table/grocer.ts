
import { GrocerStatus } from "../model/grocer";

export type IGrocerTableCell = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  status: GrocerStatus;
}

export type IGrocerTableColumn = {
  key: keyof IGrocerTableCell | 'actions';
  title: string;
}