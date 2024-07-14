import { IDetailedEntryGuide, IDetailedExitGuide, IEntryGuide, IExitGuide, IRejectionGuide, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "guide";

export const getAllEntryGuides = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IEntryGuide[]>>(`${PATH}/entry`, {
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

export const getDetailedEntryGuide = async ( id: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedEntryGuide>>(`${PATH}/entry/${id}`, {
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

/*export const downloadPDf = async ( id: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<string>>(`${PATH}/entry/pdf/${id}`, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    console.log("PDF", typeof data)
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}*/

export const getAllExitGuides = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IExitGuide[]>>(`${PATH}/exit`, {
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

export const getDetailedExitGuide = async ( id: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedExitGuide>>(`${PATH}/exit/${id}`, {
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

export const getAllRejectionGuides = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IRejectionGuide[]>>(`${PATH}/rejection`, {
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
