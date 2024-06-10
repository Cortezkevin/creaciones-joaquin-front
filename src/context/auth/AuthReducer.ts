"use client";
import { IAddress, ILoginAction, IUpdateProfile } from '@/declarations';
import { AuthState } from './'

type AuthAction = 
{ 
  type: '[Auth] - Login',
  payload: ILoginAction
} |
{ 
  type: '[Auth] - Saving Address',
  payload: boolean
} | 
{ 
  type: '[Auth] - Saving Profile',
  payload: boolean
} | 
{ 
  type: '[Auth] - Update Address',
  payload: IAddress
} |
{
  type: '[Auth] - Update Profile',
  payload: IUpdateProfile
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
    case '[Auth] - Saving Address':
      return {
        ...state,
        isSavingAddress: action.payload
      }
    case '[Auth] - Update Address':
      return {
        ...state,
        isSavingAddress: false,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            address: action.payload,
          }
        }
      }
    case '[Auth] - Saving Profile':
      return {
        ...state,
        isSavingProfile: action.payload
      }
    case '[Auth] - Update Profile':
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          profile: {
            ...state.user.profile,
            phone: action.payload.phone,
            birthDate: action.payload.birthdate
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