import { IWarehouse } from "@/declarations/model/warehouse";
import { PurchaseState } from "./";
import { IPurchaseOrder, IRawMaterial, ISupplier } from "@/declarations";

type PurchaseAction =
  | {
      type: "[Purchase] - Loading";
      payload: boolean;
    }
  | {
      type: "[Purchase] - Load Supplier";
      payload: ISupplier[];
    }
  | {
      type: "[Purchase] - Saving Supplier";
    }
  | {
      type: "[Purchase] - Supplier Created";
      payload: ISupplier;
    }
  | {
      type: "[Purchase] - Supplier Updated";
      payload: ISupplier;
    }
  | {
      type: "[Purchase] - Select Supplier";
      payload: ISupplier | null;
    }
  | {
      type: "[Purchase] - Load PurchaseOrder";
      payload: IPurchaseOrder[];
    }
  | {
      type: "[Purchase] - Saving PurchaseOrder";
    }
  | {
      type: "[Purchase] - PurchaseOrder Created";
      payload: IPurchaseOrder;
    }
  | {
      type: "[Purchase] - Select PurchaseOrder";
      payload: IPurchaseOrder | null;
    }
  | {
      type: "[Purchase] - Load RawMaterial";
      payload: IRawMaterial[];
    }
  | {
      type: "[Purchase] - Saving RawMaterial";
    }
  | {
      type: "[Purchase] - RawMaterial Created";
      payload: IRawMaterial;
    }
  | {
      type: "[Purchase] - RawMaterial Updated";
      payload: IRawMaterial;
    }
  | {
      type: "[Purchase] - Select RawMaterial";
      payload: IRawMaterial | null;
    };

export const PurchaseReducer = (
  state: PurchaseState,
  action: PurchaseAction
): PurchaseState => {
  switch (action.type) {
    case "[Purchase] - Loading":
      return {
        ...state,
        loadingData: action.payload,
      };
    case "[Purchase] - Load Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          suppliers: action.payload,
        },
      };
    case "[Purchase] - Select Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          selected:
            state.supplier.suppliers.find(
              (u: ISupplier) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving Supplier":
      return {
        ...state,
        supplier: {
          ...state.supplier,
          loading: true,
        },
      };
    case "[Purchase] - Supplier Updated":
      return {
        ...state,
        supplier: {
          suppliers: state.supplier.suppliers.map((c: ISupplier) => {
            if (c.id === action.payload.id) {
              return action.payload;
            }
            return c;
          }),
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Supplier Created":
      return {
        ...state,
        supplier: {
          suppliers: [...state.supplier.suppliers, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Load RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          rawMaterials: action.payload,
        },
      };
    case "[Purchase] - Select RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          selected:
            state.rawMaterial.rawMaterials.find(
              (u: IRawMaterial) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving RawMaterial":
      return {
        ...state,
        rawMaterial: {
          ...state.rawMaterial,
          loading: true,
        },
      };
    case "[Purchase] - RawMaterial Updated":
      return {
        ...state,
        rawMaterial: {
          rawMaterials: state.rawMaterial.rawMaterials.map(
            (c: IRawMaterial) => {
              if (c.id === action.payload.id) {
                return action.payload;
              }
              return c;
            }
          ),
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - RawMaterial Created":
      return {
        ...state,
        rawMaterial: {
          rawMaterials: [...state.rawMaterial.rawMaterials, action.payload],
          selected: null,
          loading: false,
        },
      };
    case "[Purchase] - Load PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          purchaseOrders: action.payload,
        },
      };
    case "[Purchase] - Select PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          selected:
            state.purchaseOrder.purchaseOrders.find(
              (u: IPurchaseOrder) => u.id === action.payload?.id
            ) || null,
        },
      };
    case "[Purchase] - Saving PurchaseOrder":
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          loading: true,
        },
      };
    case "[Purchase] - PurchaseOrder Created":
      return {
        ...state,
        purchaseOrder: {
          purchaseOrders: [
            ...state.purchaseOrder.purchaseOrders,
            action.payload,
          ],
          selected: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};
