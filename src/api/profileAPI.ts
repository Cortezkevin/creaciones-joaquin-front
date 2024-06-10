import { ResponseWrapper, IUpdateProfile } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "profile";

export const update = async (profile: IUpdateProfile ) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IUpdateProfile>>(PATH, profile, {
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