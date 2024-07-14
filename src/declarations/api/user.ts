import { Status } from "../model";

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: Status;
  roles: string[];
}

export type UpdateUser = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  roles: string[];
}

export type UpdateProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
}