export type ICategoryTableCell = {
  id: string;
  name: string;
  url_image: string;
}

export type ICategoryTableColumn = {
  key: keyof ICategoryTableCell | 'actions';
  title: string;
}