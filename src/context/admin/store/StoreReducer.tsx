import {
  ICategory,
  ICollection,
  IProduct,
  ISubCategory,
  IUser,
} from "@/declarations";
import { StoreState } from "./";
import { IUsersTableCell } from "@/declarations/table/users";

type StoreAction =
  | {
      type: "[Store] - Loading";
      payload: boolean;
    }
  | {
      type: "[Store] - Load Categories";
      payload: ICategory[];
    }
  | {
      type: "[Store] - Saving Category";
    }
  | {
      type: "[Store] - Category Created";
      payload: ICategory;
    }
  | {
      type: "[Store] - Category Updated";
      payload: ICategory;
    }
  | {
      type: "[Store] - Select Category";
      payload: ICategory | null;
    }
  | {
      type: "[Store] - Load Collections";
      payload: ICollection[];
    }
  | {
      type: "[Store] - Saving Collection";
    }
  | {
      type: "[Store] - Collection Created";
      payload: ICollection;
    }
  | {
      type: "[Store] - Collection Updated";
      payload: ICollection;
    }
  | {
      type: "[Store] - Select Collection";
      payload: ICollection | null;
    }
  | {
      type: "[Store] - Load SubCategories";
      payload: ISubCategory[];
    }
  | {
      type: "[Store] - Saving SubCategory";
    }
  | {
      type: "[Store] - SubCategory Created";
      payload: ISubCategory;
    }
  | {
      type: "[Store] - SubCategory Updated";
      payload: ISubCategory;
    }
  | {
      type: "[Store] - Select SubCategory";
      payload: ISubCategory | null;
    }
  | {
      type: "[Store] - Load Products";
      payload: IProduct[];
    }
  | {
      type: "[Store] - Saving Product";
    }
  | {
      type: "[Store] - Product Created";
      payload: IProduct;
    }
  | {
      type: "[Store] - Product Updated";
      payload: IProduct;
    }
  | {
      type: "[Store] - Select Product";
      payload: IProduct | null;
    }
  | {
      type: "[Store] - Load Users";
      payload: IUser[];
    }
  | {
      type: "[Store] - Saving User";
    }
  | {
      type: "[Store] - User Updated";
      payload: IUser;
    }
  | {
      type: "[Store] - Select User";
      payload: IUsersTableCell | null;
    };

export const StoreReducer = (
  state: StoreState,
  action: StoreAction
): StoreState => {
  switch (action.type) {
    case "[Store] - Loading" :
      return {
        ...state,
        loadingData: action.payload
      };
    case "[Store] - Load Categories":
      return {
        ...state,
        category: {
          ...state.category,
          categories: action.payload,
        },
      };
    case "[Store] - Select Category":
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.payload,
        },
      };
    case "[Store] - Saving Category":
      return {
        ...state,
        category: {
          ...state.category,
          loading: true,
        },
      };
    case "[Store] - Category Updated":
      return {
        ...state,
        category: {
          categories: state.category.categories.map((c: ICategory) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Category Created":
      return {
        ...state,
        category: {
          categories: [...state.category.categories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Load Collections":
      return {
        ...state,
        collection: {
          ...state.collection,
          collections: action.payload,
        },
      };
    case "[Store] - Select Collection":
      return {
        ...state,
        collection: {
          ...state.collection,
          selected: action.payload,
        },
      };
    case "[Store] - Saving Collection":
      return {
        ...state,
        collection: {
          ...state.collection,
          loading: true,
        },
      };
    case "[Store] - Collection Updated":
      return {
        ...state,
        collection: {
          collections: state.collection.collections.map((c: ICollection) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Collection Created":
      return {
        ...state,
        collection: {
          collections: [...state.collection.collections, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Load SubCategories":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          subcategories: action.payload,
        },
      };
    case "[Store] - Select SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          selected: action.payload,
        },
      };
    case "[Store] - Saving SubCategory":
      return {
        ...state,
        subcategory: {
          ...state.subcategory,
          loading: true,
        },
      };
    case "[Store] - SubCategory Updated":
      return {
        ...state,
        subcategory: {
          subcategories: state.subcategory.subcategories.map((c: ISubCategory) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - SubCategory Created":
      return {
        ...state,
        subcategory: {
          subcategories: [...state.subcategory.subcategories, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Load Products":
      return {
        ...state,
        product: {
          ...state.product,
          products: action.payload,
        },
      };
    case "[Store] - Select Product":
      return {
        ...state,
        product: {
          ...state.product,
          selected: action.payload,
        },
      };
    case "[Store] - Saving Product":
      return {
        ...state,
        product: {
          ...state.product,
          loading: true,
        },
      };
    case "[Store] - Product Updated":
      return {
        ...state,
        product: {
          products: state.product.products.map((c: IProduct) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Product Created":
      return {
        ...state,
        product: {
          products: [...state.product.products, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Store] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Store] - Load Users":
      return {
        ...state,
        user: {
          ...state.user,
          users: action.payload,
        },
      };
    case "[Store] - Select User":
      return {
        ...state,
        user: {
          ...state.user,
          selected:
            state.user.users.find((u: IUser) => u.id === action.payload?.id) || null,
        },
      };
    case "[Store] - Saving User":
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case "[Store] - User Updated":
      return {
        ...state,
        user: {
          users: state.user.users.map((u: IUser) => {
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
