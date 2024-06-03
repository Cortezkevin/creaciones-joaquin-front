"use client";

import { ReactElement, useEffect, useReducer, useState } from "react";
import { AuthContext, AuthReducer } from "./";
import { IAddress, ICart, IUser, NewUser } from "@/declarations";
import { addressAPI, changePassword, login, register, validateToken } from "@/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface AuthState {
  isLogged: boolean;
  isAdmin: boolean;
  isSavingAddress: boolean;
  user: IUser;
}

const name_INITIAL_STATE: AuthState = {
  isAdmin: false,
  isLogged: false,
  isSavingAddress: false,
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
    profile: {
      birthDate: "",
      address: undefined,
      phone: ""
    }
  },
};

export default function AuthProvider({ children }: Props) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [state, dispatch] = useReducer(AuthReducer, name_INITIAL_STATE);

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "null") as IUser;
    setIsLoadingUserData(true);
    if( user ){
      if (user !== null && user !== undefined) {
        dispatch({
          type: "[Auth] - Login",
          payload: {
            isAdmin: user.roles.includes("ROLE_ADMIN"),
            user: user,
          },
        });
      } else {
        Cookies.remove("token");
        Cookies.remove("user");
        dispatch({
          type: "[Auth] - Logout",
        });
      }
    }
    console.log("NO HAY USUARIO" , user);
    const address = JSON.parse(Cookies.get("address") || "null") as IAddress;
    dispatch({
      type: "[Auth] - Update Address",
      payload: address
    })
    setIsLoadingUserData(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);
    if (data && data.success) {
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.user.roles.includes("ROLE_ADMIN"),
          user: data.content.user,
        },
      });
      toast.success(data.message);
      return true;
    }
    toast.error(data!.message + "");
    return false;
  };

  const handleUpdateAddress = async ( address: IAddress ) => {
    dispatch({
      type: "[Auth] - Saving Address",
      payload: true
    })
    const data = await addressAPI.update(address);
    if( data?.success ){
      dispatch({
        type: "[Auth] - Update Address",
        payload: data.content
      })
      toast.success(data.message);
    }else {
      toast.error(data?.message || "Ocurrio un error");
      dispatch({
        type: "[Auth] - Saving Address",
        payload: false
      })
    }
  }
  
  const validateSession = async () => {
    const data = await validateToken(Cookies.get("token") || '');
    if( data && data.success){
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.roles.includes("ROLE_ADMIN"),
          user: data.content
        }
      })
    }else {
      dispatch({
        type: "[Auth] - Logout"
      })
    }
  }

  const handleRegister = async (newUser: NewUser) => {
    const data = await register(newUser);
    console.log("REGISTER RESPONSE", data);
    if (data && data.success) {
      dispatch({
        type: "[Auth] - Login",
        payload: {
          isAdmin: data.content.user.roles.includes("ROLE_ADMIN"),
          user: data.content.user,
        },
      });
      toast.success(data.message);
      return true;
    }
    toast.error(data!.message + "");
    return false;
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
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
    Cookies.set("cart", JSON.stringify(newMemoryCart));
    Cookies.remove("address");
    dispatch({
      type: "[Auth] - Logout",
    });
    toast.success("Se cerro la sesion");
  };

  const handleUpdateAddressMemory = (address: IAddress) => {
    Cookies.set("address", JSON.stringify( address ));
    dispatch({
      type: "[Auth] - Update Address",
      payload: address
    })
  }

  const handleChangePassword = async (password: string, confirmPassword: string, token: string) => {
    const response = await changePassword({ password, confirmPassword, tokenPassword: token });
    if( response?.success ){
      toast.success( response.message );
      return true;
    }else {
      toast.error( response?.message || "Ocurrio un error" );
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        validateSession,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        onUpdateAddress: handleUpdateAddress,
        onUpdateAddressMemory: handleUpdateAddressMemory,
        onChangePassword: handleChangePassword,
        isLoadingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
