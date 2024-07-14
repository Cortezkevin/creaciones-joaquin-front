import { IAddress, IDetailedOrder, IDetailedPreparationOrder, IDetailedShippingOrder, IOrder, IPreparationOrder, IShippingOrder, ResponseWrapper, CompletedOrderPreparation } from "@/declarations";
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

export const getAllShippingOrders = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IShippingOrder[]>>(PATH + "/shipping", {
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

export const getAllPreparationOrders = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IPreparationOrder[]>>(PATH + "/preparation", {
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

export const getPreparationOrder = async (preparationOrderId: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedPreparationOrder>>(PATH+"/preparation/"+ preparationOrderId, {
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

export const getShippingOrder = async (shippingOrderId: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedShippingOrder>>(PATH+"/shipping/"+ shippingOrderId, {
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

export const cancel = async (orderId: string) => {
  try {
    const response = await AxiosInstance.put<ResponseWrapper<IOrder>>(PATH + "/cancel/" + orderId, {
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

export const startShippingOrder = async (data: { orderId: string, userId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IShippingOrder>>(PATH + "/shipping/start", data, {
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

export const checkPrepareShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IShippingOrder>>(PATH + "/shipping/prepare", data, {
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

export const checkTransitShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IShippingOrder>>(PATH + "/shipping/transit", data, {
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

export const completeShippingOrder = async (data: { orderShippingId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IShippingOrder>>(PATH + "/shipping/complete", data, {
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

export const startPreparationOrder = async (data: { orderId: string, userId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IPreparationOrder>>(PATH + "/preparation/start", data, {
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

export const checkPackagingPreparationOrder = async (data: { preparationOrderId: string }) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IPreparationOrder>>(PATH + "/preparation/packaging", data, {
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

export const completePreparationOrder = async (completePreparationOrder: CompletedOrderPreparation) => {
  try {
    const response = await AxiosInstance.post<ResponseWrapper<IPreparationOrder>>(PATH + "/preparation/complete", completePreparationOrder, {
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
