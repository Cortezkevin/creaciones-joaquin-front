import { ICart, IUser, JwtToken, NewUser, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cokkies from 'js-cookie';
const PATH = "auth/";

export const login = async (email: string, password: string) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<JwtToken>>(PATH + "login", { email, password });
    //if( data.success ){
      Cokkies.set('token', data.content.token);
      Cokkies.set('user',JSON.stringify(data.content.user));
      const newMemoryCart: ICart = {
        id: "",
        user_id : "",
        cartItems: [],
        tax: "0.00",
        discount: "0.00",
        subtotal: "0.00",
        shippingCost: "0.00",
        total: "0.00"
      }
      Cokkies.set("cart", JSON.stringify(newMemoryCart));
      Cokkies.remove("address");
    //}
    //console.log("RESPONSE LOGIN", data);
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

export const register = async (newUser: NewUser) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<JwtToken>>(PATH + "register", newUser);
    if( data.success ){
      Cokkies.set('token', data.content.token);
      Cokkies.set('user',JSON.stringify(data.content.user));
      const newMemoryCart: ICart = {
        id: "",
        user_id : "",
        cartItems: [],
        tax: "0.00",
        discount: "0.00",
        subtotal: "0.00",
        shippingCost: "0.00",
        total: "0.00"
      }
      Cokkies.set("cart", JSON.stringify(newMemoryCart));
      Cokkies.remove("address");
    }
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

export const sendConfirmationEmail = async (to: string) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<string>>(PATH + "sendConfirmationEmail?to=" + to);
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

export const changePassword = async ({ password, confirmPassword, tokenPassword }: { password: string, confirmPassword: string, tokenPassword: string }) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<string>>(PATH + "changePassword", { password, confirmPassword, tokenPassword });
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

export const validateToken = async ( token: string  ) => {
  try{
    const response = await fetch("http://localhost:4000/api/auth/getUserFromToken", 
    { method: "GET", credentials: "omit", headers: { "Authorization": "Bearer " + token }, }
    );
    const data = await response.json() as ResponseWrapper<IUser>;
    if( data && data.success ){
      Cokkies.set('user',JSON.stringify(data.content));
      return data;
    }else {
      Cokkies.remove("token");
      Cokkies.remove("user");
    }
    return null;
  }catch(e){
    Cokkies.remove("token");
    Cokkies.remove("user");
    if(isAxiosError(e)){
      if( e.response?.status === 401){
        return null;
      }
      return null;
    }
    return null;
  }
}