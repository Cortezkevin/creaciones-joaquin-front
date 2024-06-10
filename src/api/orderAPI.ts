import { IAddress, IDetailedOrder, IOrder, ResponseWrapper, UpdateOrder } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "order";

export const getAllOrders = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IOrder[]>>(PATH, {
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

export const getDetailedOrder = async (orderId: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedOrder>>(PATH+"/"+ orderId, {
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

export const getOrdersByUser = async (userId: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IOrder[]>>(PATH+"/findBy/"+ userId, {
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

export const update = async (order: UpdateOrder) => {
  try {
    const response = await AxiosInstance.put<ResponseWrapper<IOrder>>(PATH, order, {
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