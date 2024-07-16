"use client";

import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { GrocerModal } from "@/components/GrocerModal";
import { EmployeeContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import { GrocerStatus } from "@/declarations/model/grocer";
import { IGrocerTableCell, IGrocerTableColumn } from "@/declarations/table/grocer";
import { Chip, Tooltip } from "@nextui-org/react";
import React, { useContext } from "react";

const columns: IGrocerTableColumn[] = [
  {
    key: "fullName",
    title: "Nombre Completo",
  },
  {
    key: "email",
    title: "Email"
  },
  {
    key: "phone",
    title: "Telefono",
  },
  {
    key: "status",
    title: "Estado",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function CarrierPage() {

  const { grocer: { grocers }, loadingData, onSelectGrocer, loadGrocers } = React.useContext(EmployeeContext);
  const { isAdmin } = useContext( AuthContext );

  const renderCell = React.useCallback(
    (
      item: IGrocerTableCell,
      columnKey: keyof IGrocerTableCell | "actions",
      modalProps: DataTableModalProps<IGrocerTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
      switch (columnKey) {
        case "fullName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "phone":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                cellValue as GrocerStatus === "EMPAQUETANDO" || cellValue as GrocerStatus === "PROCESANDO_PEDIDO" 
                  ? "warning"
                  : cellValue as GrocerStatus === "EN_DESCANSO"
                  ? "danger"
                  : "success"
              }
            >
              {cellValue}
            </Chip>
          );
          case "actions":
            return (
              isAdmin 
              ? (
                <div className="relative flex justify-center items-center gap-2">
                  <Tooltip color="warning" content="Edit">
                    <span className="text-lg text-warning cursor-pointer active:opacity-50">
                      <i className="fa-solid fa-pen-to-square" onClick={() => {
                        onSelectGrocer( item );
                        modalProps.openModal( true );
                      }}></i>
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
              ) : 
              (
                <div>No puedes realizar acciones</div>
              )
            );
        default:
          return <>{cellValue}</>;
      }
    },
    [ isAdmin ]
  );

  React.useEffect(() => {
    loadGrocers();
  },[]);

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Almaceneros</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
       emptyMessage="No se encontraron almaceneros"
        filterBy={{ key: "fullName", text: "Nombre" }}
        data={grocers}
        showCreateButton={ isAdmin }
        columns={columns}
        modal={GrocerModal}
      />
    </div>
  );
}
