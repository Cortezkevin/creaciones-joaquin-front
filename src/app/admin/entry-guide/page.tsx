"use client";

import { guideAPI } from "@/api";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { SupplierModal } from "@/components/SupplierModal";
import { AuthContext } from "@/context";
import { IEntryGuide, IEntryGuideTableCell, IEntryGuideTableColumn } from "@/declarations";
import { formatDate } from "@/utils/utils";
import { Link, Tooltip } from "@nextui-org/react";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";
import React from "react";

const columns: IEntryGuideTableColumn[] = [
  {
    key: "grocer",
    title: "Almacenero",
  },
  {
    key: "date",
    title: "Fecha",
  },
  {
    key: "productConditions",
    title: "Condiciones",
  },
  {
    key: "purchaseOrderId",
    title: "Orden de Compra"
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

export default function EntryGuidesPage() {

  const [entryGuides, setEntryGuides] = React.useState<IEntryGuide[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { isAdmin } = React.useContext( AuthContext );

  const router = useRouter();

  const renderCell = React.useCallback(
    (
      item: IEntryGuideTableCell,
      columnKey: keyof IEntryGuideTableCell | "actions",
      modalProps: DataTableModalProps<IEntryGuideTableCell>
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
        case "productConditions":
          return (
            cellValue
          );
        case "purchaseOrderId":
          return (
            cellValue === "No aplica"
            ? cellValue
            : <NextLink passHref legacyBehavior href={"/admin/purchase/"+cellValue}>
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
                    onClick={() => router.push("/admin/entry-guide/" + item.id)}
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
        const response = await guideAPI.getAllEntryGuides();
        if( response?.success ){
          setEntryGuides( response.content );
        }
      })();
      setLoading( true );
    }, []);

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Guias de Entrada</h1>
      <DataTable
        isLoading={ loading }
        renderCell={renderCell}
        emptyMessage="No se encontraron guias de entrada"
        filterBy={{ key: "grocer", text: "Almacenero" }}
        data={entryGuides}
        columns={columns}
        modal={ SupplierModal }
        showCreateButton={ false }
      />
    </div>
  );
}
