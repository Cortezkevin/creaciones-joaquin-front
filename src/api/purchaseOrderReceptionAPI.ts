import { AcceptAndRejectPurchaseOrder, CreatePurchaseOrder, CreateRawMaterial, IDetailedPurchaseOrderReception, IPurchaseOrder, IPurchaseOrderReception, IRawMaterial, ResponseWrapper } from "@/declarations";
import { AxiosInstance } from "./axios"
import { isAxiosError } from "axios";
import Cookies from 'js-cookie';

const PATH = "purchase_order_reception";

export const getAll = async () => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IPurchaseOrderReception[]>>(PATH, {
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

export const getById = async ( id: string ) => {
  try{
    const { data } = await AxiosInstance.get<ResponseWrapper<IDetailedPurchaseOrderReception>>(PATH + "/" + id , {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return null;
  } 
}

export const startOrderReception = async ( receptionId: string, purchaseOrderId: string, grocerId: string) => {
  try{
    const { data } = await AxiosInstance.post<ResponseWrapper<IDetailedPurchaseOrderReception>>(`${PATH}/${receptionId}?purchaseOrderId=${purchaseOrderId}&grocerId=${grocerId}`, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return null;
  } 
}

export const checkReviewOrderReception = async ( receptionId: string ) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IDetailedPurchaseOrderReception>>(`${PATH}/${receptionId}`, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return null;
  } 
}

export const acceptOrRejectOrderMaterials = async ( receptionId: string, acceptOrRejectPurchaseOrder: AcceptAndRejectPurchaseOrder ) => {
  try{
    const { data } = await AxiosInstance.put<ResponseWrapper<IDetailedPurchaseOrderReception>>(`${PATH}/acceptOrReject/${receptionId}`, acceptOrRejectPurchaseOrder , {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
    return data;
  }catch(e){
    return null;
  } 
}