import { IAddress } from "./address";
import { ICarrier } from "./carrier";
import { IGrocer } from "./grocer";

export type Status = "ACTIVO" | "INACTIVO";

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
  photoUrl: string;
  email: string;
  roles: string[];
  profile: IProfile,
  status: Status,
  roleExtraData?: IGrocer | ICarrier | null;
}