"use client";

import { IAddress, IUpdateProfile, IUser, NewUser } from '@/declarations';
import { createContext } from 'react';

export interface AuthProps {
  isLogged: boolean;
  isAdmin: boolean;
  user: IUser;
  isLoadingUserData: boolean;
  isSavingAddress: boolean;
  isSavingProfile: boolean;
  validateSession: () => void;
  onAvailableStatus: ( id: string, type: "Carrier" | "Grocer" ) => void;
  onLogin: ( email: string, password: string ) => Promise<boolean>;
  onRegister: ( newUser: NewUser ) => Promise<boolean>;
  onChangePassword: ( password: string, confirmPassword: string, token: string ) => Promise<boolean>;
  onLogout: () => void;
  onUpdateAddress: ( address: IAddress ) => void;
  onUpdateAddressMemory: ( address: IAddress ) => void;
  onUpdateProfile: ( profile: IUpdateProfile ) => Promise<boolean>;
}
export const AuthContext = createContext({} as AuthProps);