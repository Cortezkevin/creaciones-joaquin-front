import { CreateUser, IRole, IUser, ResponseWrapper, UpdateProfile, UpdateUser } from "@/declarations";
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

export const create = async (user: CreateUser) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IUser>>(PATH, user, {
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

export const updateProfile = async (user: UpdateProfile) => {
  try {
    const response = await AxiosInstance.put<ResponseWrapper<IUser>>(PATH+"/profile", user, {
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