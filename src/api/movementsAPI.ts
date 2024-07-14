import { CreateInventoryMovement, IDetailedMovements, IMovements, ResponseWrapper, UpdateInventoryMovement } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "movements";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IMovements[]>>(PATH, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const getById = async ( id: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedMovements>>(PATH + "/" + id, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const create = async ( movement: CreateInventoryMovement ) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IMovements[]>>(PATH,movement, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const update = async ( movement: UpdateInventoryMovement ) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IMovements>>(PATH,movement, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}