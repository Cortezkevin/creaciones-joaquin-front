import { ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';
import { IServerPaymentIntent } from "@/declarations/api/payment";

const PATH = "payment";

export const createPaymentIntent = async (userId: string) => {
  console.log("USUARIO " , userId)
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IServerPaymentIntent>>(PATH+"/createIndent?user="+userId, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    if(isAxiosError(e)){
      if( e.response?.status === 404){
        return e.response!.data as ResponseWrapper<IServerPaymentIntent>;
      }
    }
  } 
}