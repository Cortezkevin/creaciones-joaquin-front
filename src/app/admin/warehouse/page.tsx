"use client";

import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { WarehouseModal } from "@/components/WarehouseModal";
import { AuthContext } from "@/context";
import { WarehouseContext } from "@/context/admin/warehouse";
import { IWarehouseTableCell, IWarehouseTableColumn } from "@/declarations/table/warehouse";
import { Tooltip } from "@nextui-org/react";
import React from "react";

const columns: IWarehouseTableColumn[] = [
  {
    key: "location",
    title: "Ubicacion",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function SupplierPage() {

  const { warehouse: { warehouses }, loadingData, onSelectWarehouse } = React.useContext( WarehouseContext );
  const { isAdmin } = React.useContext( AuthContext );

  const renderCell = React.useCallback(
    (
      item: IWarehouseTableCell,
      columnKey: keyof IWarehouseTableCell | "actions",
      modalProps: DataTableModalProps<IWarehouseTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "location":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            isAdmin
            ? (
              <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectWarehouse( item );
                    modalProps.openModal( true );
                  }}></i>
                </span>
              </Tooltip>
            </div>
            ): (
              <div>No puedes realizar acciones</div>
            )
          );
        default:
          return <>{cellValue}</>;
      }
    }, [ isAdmin ]);

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Almacenes</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron almacenes"
        filterBy={{ key: "location", text: "Ubicacion" }}
        data={warehouses}
        columns={columns}
        modal={ WarehouseModal }
        showCreateButton={ isAdmin }
      />
    </div>
  );
}
