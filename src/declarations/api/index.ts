export * from './auth';
export * from './cart';
export * from './user';
export * from './order';
export * from './profile';
export * from './product';
export * from './category';
export * from './dashboard';
export * from './supplier';
export * from './movements';
export * from './collection';
export * from './rawMaterial';
export * from './subcategory';
export * from './purchaseOrder';

export type ResponseWrapper<T> = {
  success: boolean;
  message: string;
  content: T;
  status: string;
}