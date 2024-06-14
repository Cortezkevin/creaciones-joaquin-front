"use client";

import { paymentAPI } from "@/api";
import { PaymentForm } from "@/components/PaymentForm";
import { AuthContext } from "@/context/auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { IUser } from "@/declarations";
import { Spinner } from "@nextui-org/react";
import { CartContext } from "@/context/cart";

const stripePromise = loadStripe('pk_test_51LDHfGCjrtAyA6AHzh36NEGKbzPiYM9Fel9h28wMMLA7J5LZjN0ritK5oBjhzgcAozDEj0vvi3mxpi4ymWM66VQ700YW2Rdpqk');

export default function ConfirmPage() {
  const [isLoaded, setisLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [stripeClientSecret, setStripeClientSecret] = React.useState<string>("");
  
  React.useEffect(() => {
    const user = JSON.parse( Cookies.get("user") || "null" ) as IUser;
    if( !isLoaded ){
      if( user ){
        if(stripeClientSecret === "" ){
          getClientSecret( user ).then( res => {
            setStripeClientSecret( res );
          });
        }
      }
    }
  }, []);

  const getClientSecret = React.useCallback(async( user: IUser ) => {
    setIsLoading(true);
    const response = await paymentAPI.createPaymentIntent( user.id );
    if( response?.success ){
      setisLoaded(true);
      setStripeClientSecret( response.content.clientSecret );
      setIsLoading(false);
      return response.content.clientSecret;
    }else {
      toast.error(response?.message || "Ocurrio un error");
      setIsLoading(false);
      return "";
    }
    
  },[]);

  return (
    <div className="w-[100vw] min-h-[500px] p-6 flex items-center justify-center">
      {
        isLoading && (
          <Spinner label="Cargando..." size="lg" />
        )
      }
      {
        stripePromise && stripeClientSecret && (
          <Elements stripe={ stripePromise } options={{ clientSecret: stripeClientSecret }}>
            <PaymentForm /> 
          </Elements>
        )
      }
    </div>
  )
}