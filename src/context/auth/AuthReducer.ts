"use client";
import { IAddress, ILoginAction } from '@/declarations';
import { AuthState } from './'

type AuthAction = 
{ 
  type: '[Auth] - Login',
  payload: ILoginAction
} | 
{ 
  type: '[Auth] - Update Address',
  payload: IAddress
} |
{
  type: "[Auth] - Logout"
};

export const AuthReducer = ( state: AuthState, action: AuthAction ): AuthState => {
  switch( action.type ) {
    case '[Auth] - Login':
      return {
        ...state,
        isLogged: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user
      };
    case '[Auth] - Update Address':
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            address: action.payload,
          }
        }
      }
    case '[Auth] - Logout':
      return {
        ...state,
        isAdmin: false,
        isLogged: false,
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
        }
      }
    default:
      return state;
  }
}