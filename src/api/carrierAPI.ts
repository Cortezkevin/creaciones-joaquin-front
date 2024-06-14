import { ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { ICarrier } from "@/declarations/model/carrier";
import { NewCarrier } from "@/declarations/api/carrier";

const PATH = "carrier";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ICarrier[]>>(PATH, {
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

export const create = async (carrier:NewCarrier) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICarrier>>(PATH, carrier, {
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

export const availableStatus = async ( carrierId: string ) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICarrier>>(PATH + "/available/" + carrierId, {
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

