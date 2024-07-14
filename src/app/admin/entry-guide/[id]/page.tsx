"use client";

import { guideAPI, purchaseOrderAPI } from "@/api";
import { IColumn, Table } from "@/components/Table";
import { AuthContext } from "@/context";
import { PurchaseContext } from "@/context/admin/purchase";
import {
  IDetailedEntryGuide,
  IDetailedPurchaseOrder,
  IMinimalMovements,
} from "@/declarations";
import { formatDate } from "@/utils/utils";
import { Button, Chip, Input, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const columns: IColumn<IMinimalMovements>[] = [
  {
    id: "name",
    text: "Nombre",
    selector: (i: IMinimalMovements) => (
      <div key={i.productOrMaterial + i.id}>{i.productOrMaterial}</div>
    ),
  },
  {
    id: "amount",
    text: "Cantidad",
    selector: (i: IMinimalMovements) => (
      <div key={i.amount + i.id}>{i.amount}</div>
    ),
  },
  {
    id: "unitType",
    text: "Unidad de Medida",
    selector: (i: IMinimalMovements) => <div key={i.unitType + i.id}>{i.unitType}</div>,
  },
  {
    id: "date",
    text: "Fecha",
    selector: (i: IMinimalMovements) => (
      <div key={i.date + i.id}>{formatDate(i.date)}</div>
    ),
  },
];

export default function EntryGuideDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isAdmin } = React.useContext(AuthContext);

  const router = useRouter();

  const [entryGuide, setEntryGuide] = React.useState<
    IDetailedEntryGuide | undefined
  >();

  React.useEffect(() => {
    (async () => {
      const response = await guideAPI.getDetailedEntryGuide(params.id);
      if (response?.success) {
        setEntryGuide(response.content);
      }
    })();
  }, []);

  if (!entryGuide) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    router.push("http://localhost:4000/api/guide/entry/pdf/"+entryGuide.id);
  }

  return (
    <div className="w-full p-8 flex flex-col items-center justify-center overflow-auto gap-8">
      <h1 className="w-full flex font-semibold gap-2 text-2xl text-start">
        Guia de Entrada: <p className="text-primary">#{entryGuide.id}</p>
      </h1>
      <div className="w-full flex text-lg justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Responsable:</h2>
          <p>{entryGuide.grocer}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Fecha de Creación:</h2>
          <p>{formatDate(entryGuide.date)}</p>
        </div>
      </div>
      <div className="text-lg flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4 text-center ">
          <h2 className="font-semibold">Movimientos realizados ({entryGuide.movementsList.length})</h2>
          <div className="flex flex-col gap-3 w-[820px]">
            <Table
              data={entryGuide.movementsList}
              columns={columns}
              emptyMessage={"No hay movimientos"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="font-semibold">Informacion del movimiento</h2>
            <div className="flex flex-col gap-2 w-[400px]">
              <Textarea
                isReadOnly
                minRows={2}
                maxRows={4}
                label="Condiciones de los productos/materiales"
                value={entryGuide.productConditions}
                size="lg"
              />
              <Input isReadOnly label="Almacen" size="lg" value={entryGuide.warehouse} />
            </div>
          </div>
          {entryGuide.purchaseOrder && (
            <div className="flex flex-col gap-4 text-center">
              <h2 className="font-semibold">
                Informacion de la orden de compra
              </h2>
              <div className="flex flex-col gap-2 w-[400px]">
                <Input
                  isReadOnly
                  label="Solicitante"
                  value={entryGuide.purchaseOrder.requester}
                  size="lg"
                />
                <Input
                  isReadOnly
                  label="Proveedor"
                  value={entryGuide.purchaseOrder.supplier}
                  size="lg"
                />
                <Input
                  isReadOnly
                  label="Fecha"
                  size="lg"
                  value={formatDate(entryGuide.purchaseOrder.date)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="font-semibold">Acciones</h2>
          <Button
            endContent={<i className="fa-solid fa-file-pdf"></i>}
            color="danger"
            variant="ghost"
            onClick={ handleDownloadPDF }
          >
            Descargar PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
