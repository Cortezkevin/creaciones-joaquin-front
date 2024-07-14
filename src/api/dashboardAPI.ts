import { ICollection, NewCollection, ProductTopOptions, ResponseWrapper, UpdateCollection } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { ISalesByMonth, ISalesByProduct, ISalesByUser, ISalesDashboard } from "@/declarations/model/dashboard";

const PATH = "dashboard";

export const sales = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ISalesDashboard>>(PATH + "/sales");
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

export const salesMonthByYear = async ( year: number ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ISalesByMonth[]>>(PATH + "/sales/month/" + year);
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

export const salesTopByClient = async ( top: number ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ISalesByUser[]>>(PATH + "/sales/user/" + top);
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

export const salesTopByProduct = async ({ top, year, month, order }: ProductTopOptions) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ISalesByProduct[]>>(`${PATH}/sales/product?top=${top}&year=${year}&month=${month}&order=${order}`);
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