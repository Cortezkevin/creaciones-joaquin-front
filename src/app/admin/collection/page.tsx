"use client";

import { CollectionModal } from "@/components/CollectionModal";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { StoreContext } from "@/context/admin";
import { ICollectionTableCell, ICollectionTableColumn } from "@/declarations";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/react";
import React, { useContext } from "react";

const columns: ICollectionTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "category",
    title: "Categoria"
  },
  {
    key: "url_image",
    title: "Imagen",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function CollectionPage() {

  const { collection: { collections }, loadingData, onSelectCollection } = useContext(StoreContext);

  const renderCell = React.useCallback(
    (
      item: ICollectionTableCell,
      columnKey: keyof ICollectionTableCell | "actions",
      modalProps: DataTableModalProps<ICollectionTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        if(columnKey === "category"){
          cellValue = item.category.name;
        }else {
          cellValue = item[columnKey];
        }
      }
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "url_image":
          return <Image src={cellValue} width={120} height={120} />;
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectCollection( item );
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
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Colecciones</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        emptyMessage="No se encontraron colecciones"
        filterBy={{ key: "name", text: "Nombre" }}
        data={collections}
        columns={columns}
        modal={CollectionModal}
      />
    </div>
  );
}
