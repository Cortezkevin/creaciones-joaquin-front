import { IAddress } from "./address";
import { ICarrier } from "./carrier";
import { IGrocer } from "./grocer";

export type IProfile = {
  birthDate: string;
  address?: IAddress;
  phone: string;
}

export type IRole = {
  value: string;
  key: string;
}

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  profile: IProfile,
  roleExtraData?: IGrocer | ICarrier | null;
}