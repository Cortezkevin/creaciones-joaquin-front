import { ICollection, NewCollection, ResponseWrapper, UpdateCollection } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "collection";

export const create = async (newCollection: NewCollection, image: File) => {
  const formData = new FormData();
  formData.append('newCollectionDTO', JSON.stringify(newCollection));
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICollection>>(PATH , formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log(e);
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const update = async (updateCollection: UpdateCollection, image?: File) => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('updateCollectionDTO', JSON.stringify(updateCollection ));
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<ICollection>>(PATH, formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log(e);
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<ICollection[]>>(PATH + "/public");
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