"use client";

import { guideAPI } from "@/api";
import { IColumn, Table } from "@/components/Table";
import { AuthContext } from "@/context";
import {
  IDetailedEntryGuide,
  IDetailedExitGuide,
  IMinimalMovements,
} from "@/declarations";
import { formatDate } from "@/utils/utils";
import { Button, Chip, Input, Spinner, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

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
    text: "Tipo de movimiento",
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

export default function ExitGuideDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isAdmin } = React.useContext(AuthContext);

  const [exitGuide, setExitGuide] = React.useState<
    IDetailedExitGuide | undefined
  >();

  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const response = await guideAPI.getDetailedExitGuide(params.id);
      if (response?.success) {
        setExitGuide(response.content);
      }
    })();
  }, []);

  if (!exitGuide) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    router.push("http://localhost:4000/api/guide/exit/pdf/"+exitGuide.id);
  }

  return (
    <div className="w-full p-8 flex flex-col items-center justify-center overflow-auto gap-8">
      <h1 className="w-full flex font-semibold gap-2 text-2xl text-start">
        Guia de Salida: <p className="text-primary">#{exitGuide.id}</p>
      </h1>
      <div className="w-full flex text-lg justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Responsable de Almacen:</h2>
          <p>{exitGuide.grocer}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="font-semibold">Fecha de Creación:</h2>
          <p>{formatDate(exitGuide.date)}</p>
        </div>
      </div>
      <div className="text-lg flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4 text-center ">
          <h2 className="font-semibold">
            Movimientos realizados ({exitGuide.movementsList.length})
          </h2>
          <div className="flex flex-col gap-3 w-[820px]">
            <Table
              data={exitGuide.movementsList}
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
                value={exitGuide.observations}
                size="lg"
              />
              <Input
                isReadOnly
                label="Almacen"
                size="lg"
                value={exitGuide.warehouse}
              />
            </div>
          </div>
          {exitGuide.order && (
            <div className="flex flex-col gap-4 text-center">
              <h2 className="font-semibold">Informacion del Pedido</h2>
              <div className="flex flex-col gap-2 w-[400px]">
                <Input
                  isReadOnly
                  label="Cliente"
                  value={exitGuide.order.user}
                  size="lg"
                />
                <Input
                  isReadOnly
                  label="Direccion de Entrega"
                  value={exitGuide.order.shippingAddress}
                  size="lg"
                />
                <Input
                  isReadOnly
                  label="Fecha"
                  value={formatDate(exitGuide.order.createdDate)}
                  size="lg"
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
