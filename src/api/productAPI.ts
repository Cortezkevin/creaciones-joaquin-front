import { IProduct, NewProduct, ResponseWrapper, UpdateProduct } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "product";

export const create = async (newProduct: NewProduct, images: File[]) => {
  const formData = new FormData();
  formData.append('newProductDTO', JSON.stringify(newProduct));
  for(let i = 0;i < images.length; i++ ){
    formData.append('files', images[i]);
  }
  
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IProduct>>(PATH , formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
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

export const update = async (updateProduct: UpdateProduct) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IProduct>>(PATH , updateProduct , {
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

export const getById = async (id: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IProduct>>(PATH + "/public/" + id);
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

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IProduct[]>>(PATH + "/public");
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