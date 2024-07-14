import { AddItem, ICart, RemoveItem, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios";
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "cart";

export const getCartFromSession = async (userId: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ICart>>(PATH + "/fromUser?user=" + userId, {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get("token")
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

export const addItem = async (addItem: AddItem) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICart>>(PATH + "/add", addItem , {
      "headers": {
        "Content-Type": "application/json"
      }
    } );
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

export const removeItem = async (removeItem: RemoveItem) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICart>>(PATH + "/remove", removeItem , {
      "headers": {
        "Content-Type": "application/json"
      }
    } );
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

export const updateShippingCost = async (shippingCost: string, distance: number, cartId: string) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<ICart>>(PATH + "/shipping", { shippingCost, distance, cartId } , {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    } );
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

export const clearCart = async (id: string) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICart>>(PATH + "/clear?cart="+id, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    } );
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
