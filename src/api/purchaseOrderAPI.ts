import { CreatePurchaseOrder, IDetailedPurchaseOrder, IPurchaseOrder, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "purchase_order";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IPurchaseOrder[]>>(PATH, {
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

export const getById = async ( id: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedPurchaseOrder>>(PATH + "/" + id, {
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

export const cancel = async ( id: string) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IDetailedPurchaseOrder>>(PATH + "/cancel/" + id, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log({e});
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const create = async (newPurchaseOrder: CreatePurchaseOrder) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IPurchaseOrder>>(PATH, newPurchaseOrder, {
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
