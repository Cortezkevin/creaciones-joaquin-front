import { IRole, IUser, ResponseWrapper, UpdateUser } from "@/declarations";
import { AxiosInstance } from "./axios"
import Cookies from 'js-cookie';

const PATH = "user";

export const getUsers = async () => {
  try {
    const response = await AxiosInstance.get<ResponseWrapper<IUser[]>>(PATH, {
      "headers": {
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const getRoles = async () => {
  try {
    const response = await AxiosInstance.get<ResponseWrapper<IRole[]>>(PATH+"/roles", {
      "headers": {
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}

export const update = async (user: UpdateUser) => {
  try {
    const response = await AxiosInstance.put<ResponseWrapper<IUser>>(PATH, user, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
}