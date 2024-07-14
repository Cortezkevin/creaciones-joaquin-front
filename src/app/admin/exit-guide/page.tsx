"use client";

import { guideAPI, supplierAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { SupplierModal } from "@/components/SupplierModal";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import { WarehouseContext } from "@/context/admin/warehouse";
import { IEntryGuide, IEntryGuideTableCell, IEntryGuideTableColumn, IExitGuide, IExitGuideTableCell, IExitGuideTableColumn, ISupplier, ISupplierTableCell, ISupplierTableColumn } from "@/declarations";
import { formatDate } from "@/utils/utils";
import NextLink from 'next/link';
import { Button, Link, Tooltip } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";

const columns: IExitGuideTableColumn[] = [
  {
    key: "grocer",
    title: "Almacenero",
  },
  {
    key: "date",
    title: "Fecha",
  },
  {
    key: "observations",
    title: "Condiciones",
  },
  {
    key: "order",
    title: "Pedido"
  },
  {
    key: "warehouse",
    title: "Almacen",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function ExitGuidesPage() {

  const [exitGuides, setExitGuides] = React.useState<IExitGuide[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { isAdmin } = React.useContext( AuthContext );
  const router = useRouter();

  const renderCell = React.useCallback(
    (
      item: IExitGuideTableCell,
      columnKey: keyof IExitGuideTableCell | "actions",
      modalProps: DataTableModalProps<IExitGuideTableCell>
    ) => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "grocer":
          return (
            cellValue
          );
        case "date":
          return (
            formatDate(cellValue)
          );
        case "observations":
          return (
            cellValue
          );
        case "order":
          return (
            cellValue === "No aplica"
            ? cellValue
            : <NextLink passHref legacyBehavior href={"/orders/"+cellValue}>
                <Link target="_blank" underline="hover">
                  { cellValue }
                </Link>
              </NextLink>
          );
        case "warehouse":
          return (
            cellValue
          );
        case "actions":
          return (
            isAdmin
            ? (
              <div className="relative flex justify-center items-center gap-2">
                <Tooltip color="warning" content="Ver Detalles">
                  <span
                    className="text-lg text-warning cursor-pointer active:opacity-50"
                    onClick={() => router.push("/admin/exit-guide/" + item.id)}
                  >
                    <i className="fa-solid fa-eye"></i>
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

    React.useEffect(() => {
      (async() => {
        const response = await guideAPI.getAllExitGuides();
        if( response?.success ){
          setExitGuides( response.content );
        }
      })();
      setLoading( true );
    }, []);

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Guias de Salida</h1>
      <DataTable
        isLoading={ loading }
        renderCell={renderCell}
        emptyMessage="No se encontraron guias de entrada"
        filterBy={{ key: "grocer", text: "Almacenero" }}
        data={exitGuides}
        columns={columns}
        modal={ SupplierModal }
        showCreateButton={ false }
      />
    </div>
  );
}
