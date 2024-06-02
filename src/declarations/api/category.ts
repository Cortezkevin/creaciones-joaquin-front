export type NewCategory = {
  name: string;
  file: File;
}

export type UpdateCategory = {
  name: string;
  file?: File;
}