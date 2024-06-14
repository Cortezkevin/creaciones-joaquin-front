import { ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { IGrocer } from "@/declarations/model/grocer";
import { NewGrocer } from "@/declarations/api/grocer";

const PATH = "grocer";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IGrocer[]>>(PATH, {
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

export const create = async (grocer:NewGrocer) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IGrocer>>(PATH, grocer, {
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
