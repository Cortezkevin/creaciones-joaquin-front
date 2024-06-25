export type ISupplierTableCell = {
  id: string;
  name: string;
  ruc: string;
  phone: string;
  address: string;
}

export type ISupplierTableColumn = {
  key: keyof ISupplierTableCell | 'actions';
  title: string;
}