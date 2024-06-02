"use client";

import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { SubCategoryModal } from "@/components/SubCategoryModal";
import { AdminContext } from "@/context/admin";
import { ISubCategoryTableCell, ISubCategoryTableColumn } from "@/declarations";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/react";
import React from "react";

const columns: ISubCategoryTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "description",
    title: "Descripcion",
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

export default function SubCategoryPage() {

  const { subcategory: { subcategories }, loadingData, onSelectSubCategory } = React.useContext(AdminContext);

  const renderCell = React.useCallback(
    (
      item: ISubCategoryTableCell,
      columnKey: keyof ISubCategoryTableCell | "actions",
      modalProps: DataTableModalProps<ISubCategoryTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        if( columnKey === "category" ){
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
        case "description":
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
                    onSelectSubCategory( item );
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
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto">
      <h1 className="text-large font-semibold">Sub Categorias</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        typeName="sub categoria"
        filterBy="name"
        data={subcategories}
        columns={columns}
        modal={SubCategoryModal}
      />
    </div>
  );
}
