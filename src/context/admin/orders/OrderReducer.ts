import {
  ICategory,
  ICollection,
  IOrder,
  IOrderTableCell,
  IProduct,
  ISubCategory,
  IUser,
} from "@/declarations";
import { OrderState } from "./";


type OrderAction =
  | {
    type: "[Order] - Loading";
    payload: boolean;
  }
  | {
      type: "[Order] - Load Orders";
      payload: IOrder[];
    }
  | {
      type: "[Order] - Saving Order";
    }
  | {
      type: "[Order] - Order Updated";
      payload: IOrder;
    }
  | {
      type: "[Order] - Select Order";
      payload: IOrderTableCell | null;
    };

export const OrderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case "[Order] - Loading":
      return {
        ...state,
        loadingData: action.payload
      }
    case "[Order] - Load Orders":
      return {
        ...state,
        order: {
          ...state.order,
          orders: action.payload,
        },
      };
    case "[Order] - Select Order":
      return {
        ...state,
        order: {
          ...state.order,
          selected:
            state.order.orders.find((u: IOrder) => u.id === action.payload?.id) || null,
        },
      };
    case "[Order] - Saving Order":
      return {
        ...state,
        order: {
          ...state.order,
          loading: true,
        },
      };
    case "[Order] - Order Updated":
      return {
        ...state,
        order: {
          orders: state.order.orders.map((u: IOrder) => {
            if (u.id === action.payload.id) {
              return action.payload;
            }
            return u;
          }),
          selected: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
