"use client";

import { IAddress, IUser, NewUser } from '@/declarations';
import { createContext } from 'react';

export interface AuthProps {
  isLogged: boolean;
  isAdmin: boolean;
  user: IUser;
  isLoadingUserData: boolean;
  isSavingAddress: boolean;
  validateSession: () => void;
  onLogin: ( email: string, password: string ) => Promise<boolean>;
  onRegister: ( newUser: NewUser ) => Promise<boolean>;
  onChangePassword: ( password: string, confirmPassword: string, token: string ) => Promise<boolean>;
  onLogout: () => void;
  onUpdateAddress: ( address: IAddress ) => void;
  onUpdateAddressMemory: ( address: IAddress ) => void;
}
export const AuthContext = createContext({} as AuthProps);