import { ISubCategory, NewSubCategory, ResponseWrapper, UpdateSubCategory } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "sub-category";

export const create = async (newSubCategory: NewSubCategory, image: File) => {
  const formData = new FormData();
  formData.append('newSubCategory', JSON.stringify(newSubCategory));
  formData.append('file', image);
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<ISubCategory>>(PATH , formData, {
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

export const update = async (updateSubCategory: UpdateSubCategory, image?: File) => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('updateSubCategoryDTO', JSON.stringify(updateSubCategory ));
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<ISubCategory>>(PATH, formData, {
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
    const { data } = await AxiosInstance.get<ResponseWrapper<ISubCategory[]>>(PATH + "/public");
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