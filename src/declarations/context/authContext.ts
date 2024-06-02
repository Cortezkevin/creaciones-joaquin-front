import { IUser } from "../";

export type ILoginAction = {
  isAdmin: boolean;
  user: IUser
}