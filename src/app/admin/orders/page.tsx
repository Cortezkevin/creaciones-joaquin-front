"use client";
import { userAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { UserModal } from "@/components/UserModal";
import { AdminContext } from "@/context/admin";
import { IOrderTableCell, IOrderTableColumn, IUser, OrderStatus, ShippingStatus } from "@/declarations";
import { IUsersTableCell, IUsersTableColumn } from "@/declarations/table/users";
import { Chip, Tooltip } from "@nextui-org/react";
import { Table } from "@nextui-org/table";
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
    title: "Metodo de Pago"
  },
  {
    key: "total",
    title: "Total",
  },  
  {
    key: "createdDate",
    title: "Fecha de Creacion"
  },
  {
    key: "shippingStatus",
    title: "Estado de Envio"
  },
  {
    key: "status",
    title: "Estado del Pedido"
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function OrdersPage() {
  const {
    order: { orders },
    loadingData,
    onSelectUser,
  } = React.useContext(AdminContext);

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
          )
        case "paymentMethod":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          )
        case "total":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          )
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          )
        case "shippingStatus":
          return (
            <Chip size="lg" variant="flat" title={ cellValue } color={ cellValue as ShippingStatus === "EN_PREPARACION" ? 'warning' : cellValue as ShippingStatus === 'ENVIADO' ? 'success' : 'danger' }>
              {cellValue}
            </Chip>
          )
        case "status":
          return (
            <Chip size="lg" variant="flat" title={ cellValue } color={ cellValue as OrderStatus === "PENDIENTE" ? 'warning' : cellValue as OrderStatus === 'EN_PROCESO' ? 'success' : 'danger' }>
              {cellValue}
            </Chip>
          )
        case "actions":
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
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto">
      <h1 className="text-large font-semibold">Pedidos</h1>
      <DataTable
        columns={columns}
        data={orders}
        filterBy="user"
        isLoading={false}
        typeName={"Pedido"}
        modal={UserModal}
        renderCell={renderCell}
        showHeader={ false }
      />
    </div>
  );
}
