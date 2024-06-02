import { IUser, MemoryCart } from "../";

export type JwtToken = {
  token: string;
  user: IUser;
}

export type MemoryAddress = {
  lta: number;
  lng: number;
  department: string;
  province: string;
  district: string;
  urbanization: string;
  street: string;
  postalCode: number;
  fullAddress: string;
}

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  memoryCart?: MemoryCart;
  memoryAddress?: MemoryAddress;
}