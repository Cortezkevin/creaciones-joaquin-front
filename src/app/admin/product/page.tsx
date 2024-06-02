"use client";

import { productAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { ProductModal } from "@/components/ProductModal";
import { AdminContext } from "@/context/admin";
import { IProductTableCell, IProductTableColumn } from "@/declarations";
import { IProduct } from "@/declarations/model/product";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/react";
import React from "react";

const columns: IProductTableColumn[] = [
  {
    key: "name",
    title: "Nombre",
  },
  {
    key: "description",
    title: "Descripcion",
  },
  {
    key: "subCategory",
    title: "Sub Categoria"
  },
  {
    key: "price",
    title: "Price",
  },
  {
    key: "stock",
    title: "Stock",
  },
  {
    key: "images",
    title: "Imagenes",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function ProductPage() {

  const { product: { products }, loadingData, onSelectProduct } = React.useContext(AdminContext);

  const renderCell = React.useCallback(
    (
      item: IProductTableCell,
      columnKey: keyof IProductTableCell | "actions",
      modalProps: DataTableModalProps<IProductTableCell>
    ) => {
      let cellValue: any = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
        if( columnKey === "subCategory" ){
          cellValue = item.subCategory.name
        }
        if( columnKey === "collection" ) {
          cellValue = item.collection ? item.collection.name : "No Collection"
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
        case "subCategory":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "collection":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "stock":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            );
        case "images":
          return (
            <div className="flex gap-1">
              { cellValue.map((url: any) => 
                <Image key={url} src={url} width={80} height={80} />
              )}
            </div>
          )
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i className="fa-solid fa-pen-to-square" onClick={() => {
                    onSelectProduct( item );
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
      <h1 className="text-large font-semibold">Productos</h1>
      <DataTable
        isLoading={ loadingData }
        renderCell={renderCell}
        typeName="coleccion"
        filterBy="name"
        data={products}
        columns={columns}
        modal={ ProductModal }
      />
    </div>
  );
}