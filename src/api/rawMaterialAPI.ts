import { CreateRawMaterial, IRawMaterial, ResponseWrapper, UpdateRawMaterial } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "raw_material";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IRawMaterial[]>>(PATH, {
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

export const getBySupplier = async ( supplierId: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IRawMaterial[]>>(PATH + "/bySupplier?supplier=" + supplierId);
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

export const create = async (newRawMaterial: CreateRawMaterial) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IRawMaterial>>(PATH, newRawMaterial, {
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

export const update = async (rawMaterial: UpdateRawMaterial) => {  
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IRawMaterial>>(PATH, rawMaterial, {
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