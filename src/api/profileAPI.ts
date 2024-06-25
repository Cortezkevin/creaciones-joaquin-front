import { ResponseWrapper, IUpdateProfile } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "profile";

export const update = async ( profile: IUpdateProfile, image?: File ) => {
  const formData = new FormData();
  if(image){
    formData.append('file', image);
  }
  formData.append('updateProfileDTO', JSON.stringify(profile));
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IUpdateProfile>>(PATH, formData, {
      "headers": {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    console.log({e});
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<String>;
      }
      return e.response!.data as ResponseWrapper<any>;
    }
  } 
}