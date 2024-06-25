"use client";

import { supplierAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { SupplierModal } from "@/components/SupplierModal";
import { PurchaseContext } from "@/context/admin/purchase";
import { WarehouseContext } from "@/context/admin/warehouse";
import {
  IMovementsTableColumn,
  IMovementsTableCell,
  InventoryMovementType,
} from "@/declarations";
import { formatDate } from "@/utils/utils";
import { Chip, Tooltip } from "@nextui-org/react";
import React from "react";

const columns: IMovementsTableColumn[] = [
  {
    key: "productOrMaterial",
    title: "Producto/Material",
  },
  {
    key: "amount",
    title: "Cantidad",
  },
  {
    key: "type",
    title: "Tipo de Movimiento",
  },
  {
    key: "date",
    title: "Fecha",
  },
  {
    key: "warehouse",
    title: "Ubicacion",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function MovementsPage() {
  const {
    movement: { movements },
    loadingData,
  } = React.useContext(WarehouseContext);

  const renderCell = React.useCallback(
    (
      item: IMovementsTableCell,
      columnKey: keyof IMovementsTableCell | "actions",
      modalProps: DataTableModalProps<IMovementsTableCell>
    ) => {
      let cellValue = "";
      if (columnKey === "amount") {
        cellValue = item[columnKey] + "";
      } else {
        if (columnKey != "actions") {
          cellValue = item[columnKey];
        }
      }

      switch (columnKey) {
        case "productOrMaterial":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "type":
          return (
            <div className="flex flex-col">
             <Chip
                variant="flat"
                color={
                  (cellValue as InventoryMovementType) === "ENTRADA"
                    ? "success"
                    : (cellValue as InventoryMovementType) === "SALIDA"
                    ? "danger"
                    : "warning"
                }
              >
                {cellValue}
              </Chip>
            </div>
          );
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{ formatDate(cellValue) }</p>
            </div>
          );
        case "warehouse":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-eye"></i>
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
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Movimientos</h1>
      <DataTable
        isLoading={loadingData}
        renderCell={renderCell}
        typeName="movimiento"
        filterBy="type"
        data={movements}
        columns={columns}
        modal={SupplierModal}
        showCreateButton={ false }
      />
    </div>
  );
}
