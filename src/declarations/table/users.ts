export type IUsersTableCell = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export type IUsersTableColumn = {
  key: keyof IUsersTableCell | 'actions';
  title: string;
}