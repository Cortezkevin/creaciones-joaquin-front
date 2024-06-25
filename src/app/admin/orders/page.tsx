"use client";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { UserModal } from "@/components/UserModal";
import { OrderContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import {
  IOrderTableCell,
  IOrderTableColumn,
  OrderStatus,
  PreparationStatus,
  ShippingStatus,
} from "@/declarations";
import { Utils } from "@/utils";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const columns: IOrderTableColumn[] = [
  {
    key: "user",
    title: "Usuario",
  },
  {
    key: "shippingAddress",
    title: "Direccion de Envio",
  },
  {
    key: "paymentMethod",
    title: "Metodo de Pago",
  },
  {
    key: "total",
    title: "Total",
  },
  {
    key: "createdDate",
    title: "Fecha de Creacion",
  },
  {
    key: "preparationStatus",
    title: "Estado de Preparacion"
  },
  {
    key: "shippingStatus",
    title: "Estado de Envio",
  },
  {
    key: "status",
    title: "Estado del Pedido",
  },
/*   {
    key: "actions",
    title: "Acciones",
  }, */
];

export default function OrdersPage() {
  const router = useRouter();

  const { user } = React.useContext(AuthContext);

  const {
    order: { orders },
    loadOrders
  } = React.useContext(OrderContext);

  const renderCell = React.useCallback(
    (
      item: IOrderTableCell,
      columnKey: keyof IOrderTableCell | "actions",
      modalProps: DataTableModalProps<IOrderTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
      switch (columnKey) {
        case "user":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "shippingAddress":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "paymentMethod":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "total":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{Utils.formatDate(cellValue)}</p>
            </div>
          );
        case "preparationStatus":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as PreparationStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as PreparationStatus) === "EN_PREPARACION" || (cellValue as PreparationStatus) === "LISTO_PARA_RECOGER"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "shippingStatus":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as ShippingStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as ShippingStatus) === "EN_PREPARACION" || (cellValue as ShippingStatus) === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as OrderStatus) === "PENDIENTE" || (cellValue as OrderStatus) === "PREPARADO"
                  ? "warning"
                  : (cellValue as OrderStatus) === "EN_PROCESO" || (cellValue as OrderStatus) === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        /* case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Editar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-ban"></i>
                </span>
              </Tooltip>
            </div>
          ); */
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );
  
  React.useEffect(() => {
    loadOrders();
  },[]);

  const handleShowPreparationPendingOrders = () => {
    router.push("/admin/orders/preparation");
  };

  const handleShowShippingPendingOrders = () => {
    router.push("/admin/orders/shipping");
  };

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <div className="flex justify-between items-center">
        <h1 className="text-large font-semibold">Pedidos</h1>
        {user.roles.includes("ROLE_WAREHOUSE") ? (
          <Button
            onClick={handleShowPreparationPendingOrders}
            color="primary"
            className="text-white"
          >
            Ver Pedidos a preparar
          </Button>
        ) : user.roles.includes("ROLE_TRANSPORT") ? (
          <Button
            onClick={handleShowShippingPendingOrders}
            color="primary"
            className="text-white"
          >
            Ver Pedidos a enviar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleShowPreparationPendingOrders}
              color="primary"
              className="text-white"
            >
              Ver Pedidos a preparar
            </Button>
            <Button
              onClick={handleShowShippingPendingOrders}
              color="primary"
              className="text-white"
            >
              Ver Pedidos a enviar
            </Button>
          </div>
        )}
      </div>
      <DataTable
        columns={columns}
        data={orders}
        filterBy="user"
        isLoading={false}
        typeName={"Pedido"}
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={false}
      />
    </div>
  );
}
