import { ICategory, JwtToken, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "category";

export const create = async (name: string, image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ICategory>>(PATH + "/" + name , formData, {
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

export const update = async (id:string, newName: string, image?: File) => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('updateCategoryDTO', JSON.stringify({ id, newName }));
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<ICategory>>(PATH, formData, {
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
    const { data } = await AxiosInstance.get<ResponseWrapper<ICategory[]>>(PATH + "/public");
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