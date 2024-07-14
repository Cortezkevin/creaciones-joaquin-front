export type IEntryGuideTableCell = {
  id: string;
  date: string;
  productConditions: string;
  grocer: string;
  purchaseOrderId: string;
  warehouse: string;
}

export type IEntryGuideTableColumn = {
  key: keyof IEntryGuideTableCell | 'actions';
  title: string;
}

export type IExitGuideTableCell = {
  id: string;
  date: string;
  observations: string;
  grocer: string;
  order: string;
  warehouse: string;
}

export type IExitGuideTableColumn = {
  key: keyof IExitGuideTableCell | 'actions';
  title: string;
}

export type IRejectionGuideTableCell = {
  id: string;
  date: string;
  reason: string;
  productConditions: string;
  suggestions: string;
  grocer: string;
  purchaseOrder: string;
}

export type IRejectionGuideTableColumn = {
  key: keyof IRejectionGuideTableCell | 'actions';
  title: string;
}