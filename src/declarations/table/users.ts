import { Status } from "../model";

export type IUsersTableCell = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: Status,
  roles: string[];
}

export type IUsersTableColumn = {
  key: keyof IUsersTableCell | 'actions';
  title: string;
}