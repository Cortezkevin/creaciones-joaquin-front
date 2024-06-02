export * from './auth';
export * from './cart';
export * from './category';
export * from './collection';
export * from './subcategory';
export * from './product';

export type ResponseWrapper<T> = {
  success: boolean;
  message: string;
  content: T;
  status: string;
}