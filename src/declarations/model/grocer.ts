export type GrocerStatus = "DISPONIBLE" | "PROCESANDO_PEDIDO" | "EMPAQUETANDO" | "EN_DESCANSO";

export type IGrocer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  userId: string;
  status: GrocerStatus;
}