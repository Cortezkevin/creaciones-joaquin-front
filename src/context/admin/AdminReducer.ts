import {
  ICategory,
  ICollection,
  IOrder,
  IOrderTableCell,
  IProduct,
  ISubCategory,
  IUser,
} from "@/declarations";
import { AdminState } from "./";
import { IUsersTableCell } from "@/declarations/table/users";

type AdminAction =
  | {
      type: "[Admin] - Loading";
      payload: boolean;
    }
  | {
      type: "[Admin] - Load Categories";
      payload: ICategory[];
    }
  | {
      type: "[Admin] - Saving Category";
    }
  | {
      type: "[Admin] - Category Created";
      payload: ICategory;
    }
  | {
      type: "[Admin] - Category Updated";
      payload: ICategory;
    }
  | {
      type: "[Admin] - Select Category";
      payload: ICategory | null;
    }
  | {
      type: "[Admin] - Load Collections";
      payload: ICollection[];
    }
  | {
      type: "[Admin] - Saving Collection";
    }
  | {
      type: "[Admin] - Collection Created";
      payload: ICollection;
    }
  | {
      type: "[Admin] - Collection Updated";
      payload: ICollection;
    }
  | {
      type: "[Admin] - Select Collection";
      payload: ICollection | null;
    }
  | {
      type: "[Admin] - Load SubCategories";
      payload: ISubCategory[];
    }
  | {
      type: "[Admin] - Saving SubCategory";
    }
  | {
      type: "[Admin] - SubCategory Created";
      payload: ISubCategory;
    }
  | {
      type: "[Admin] - SubCategory Updated";
      payload: ISubCategory;
    }
  | {
      type: "[Admin] - Select SubCategory";
      payload: ISubCategory | null;
    }
  | {
      type: "[Admin] - Load Products";
      payload: IProduct[];
    }
  | {
      type: "[Admin] - Saving Product";
    }
  | {
      type: "[Admin] - Product Created";
      payload: IProduct;
    }
  | {
      type: "[Admin] - Product Updated";
      payload: IProduct;
    }
  | {
      type: "[Admin] - Select Product";
      payload: IProduct | null;
    }
  | {
      type: "[Admin] - Load Users";
      payload: IUser[];
    }
  | {
      type: "[Admin] - Saving User";
    }
  | {
      type: "[Admin] - User Updated";
      payload: IUser;
    }
  | {
      type: "[Admin] - Select User";
      payload: IUsersTableCell | null;
    }
  | {
      type: "[Admin] - Load Orders";
      payload: IOrder[];
    }
  | {
      type: "[Admin] - Saving Order";
    }
  | {
      type: "[Admin] - Order Updated";
      payload: IOrder;
    }
  | {
      type: "[Admin] - Select Order";
      payload: IOrderTableCell | null;
    };

export const AdminReducer = (
  state: AdminState,
  action: AdminAction
): AdminState => {
  switch (action.type) {
    case "[Admin] - Load Categories":
      return {
        ...state,
        category: {
          ...state.category,
          categories: action.payload,
        },
      };
    case "[Admin] - Select Category":
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.payload,
        },
      };
    case "[Admin] - Saving Category":
      return {
        ...state,
        category: {
          ...state.category,
          loading: true,
        },
      };
    case "[Admin] - Category Updated":
      return {
        ...state,
        category: {
          categories: state.category.categories.map((c) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Category Created":
      return {
        ...state,
        category: {
          categories: [...state.category.categories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Load Collections":
      return {
        ...state,
        collection: {
          ...state.collection,
          collections: action.payload,
        },
      };
    case "[Admin] - Select Collection":
      return {
        ...state,
        collection: {
          ...state.collection,
          selected: action.payload,
        },
      };
    case "[Admin] - Saving Collection":
      return {
        ...state,
        collection: {
          ...state.collection,
          loading: true,
        },
      };
    case "[Admin] - Collection Updated":
      return {
        ...state,
        collection: {
          collections: state.collection.collections.map((c) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Collection Created":
      return {
        ...state,
        collection: {
          collections: [...state.collection.collections, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Load SubCategories":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          subcategories: action.payload,
        },
      };
    case "[Admin] - Select SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          selected: action.payload,
        },
      };
    case "[Admin] - Saving SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          loading: true,
        },
      };
    case "[Admin] - SubCategory Updated":
      return {
        ...state,
        subcategory: {
          subcategories: state.subcategory.subcategories.map((c) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - SubCategory Created":
      return {
        ...state,
        subcategory: {
          subcategories: [...state.subcategory.subcategories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Load Products":
      return {
        ...state,
        product: {
          ...state.product,
          products: action.payload,
        },
      };
    case "[Admin] - Select Product":
      return {
        ...state,
        product: {
          ...state.product,
          selected: action.payload,
        },
      };
    case "[Admin] - Saving Product":
      return {
        ...state,
        product: {
          ...state.product,
          loading: true,
        },
      };
    case "[Admin] - Product Updated":
      return {
        ...state,
        product: {
          products: state.product.products.map((c) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Product Created":
      return {
        ...state,
        product: {
          products: [...state.product.products, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Admin] - Load Users":
      return {
        ...state,
        user: {
          ...state.user,
          users: action.payload,
        },
      };
    case "[Admin] - Select User":
      return {
        ...state,
        user: {
          ...state.user,
          selected:
            state.user.users.find((u) => u.id === action.payload?.id) || null,
        },
      };
    case "[Admin] - Saving User":
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case "[Admin] - User Updated":
      return {
        ...state,
        user: {
          users: state.user.users.map((u) => {
            if (u.id === action.payload.id) {
              return action.payload;
            }
            return u;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Admin] - Load Orders":
      return {
        ...state,
        order: {
          ...state.order,
          orders: action.payload,
        },
      };
    case "[Admin] - Select Order":
      return {
        ...state,
        order: {
          ...state.order,
          selected:
            state.order.orders.find((u) => u.id === action.payload?.id) || null,
        },
      };
    case "[Admin] - Saving Order":
      return {
        ...state,
        order: {
          ...state.order,
          loading: true,
        },
      };
    case "[Admin] - Order Updated":
      return {
        ...state,
        order: {
          orders: state.order.orders.map((u) => {
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
