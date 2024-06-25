"use client";
import { purchaseOrderReceptionAPI } from "@/api";

import { PurchaseContext } from "@/context/admin/purchase";
import { AuthContext } from "@/context/auth";
import {
  IPurchaseOrderReception,
  IPurchaseOrderReceptionTableCell,
  IPurchaseOrderReceptionTableColumn,
} from "@/declarations";
import { IGrocer } from "@/declarations/model/grocer";
import { Utils } from "@/utils";
import { Button, Chip } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const columns: IPurchaseOrderReceptionTableColumn[] = [
  {
    key: "grocer",
    title: "A cargo de",
  },
  {
    key: "createdDate",
    title: "Fecha de Creacion",
  },
  {
    key: "startDate",
    title: "Fecha de Inicio",
  },
  {
    key: "reviewDate",
    title: "Fecha de Revision",
  },
  {
    key: "completedDate",
    title: "Fecha de Finalizacion",
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

export default function ReceptionPurchaseOrdersPage() {
  const router = useRouter();

  const { user, isAdmin, validateSession } = React.useContext(AuthContext);
  const { loadPurchaseOrders } = React.useContext(PurchaseContext);

  const [purchaseOrderReceptions, setPurchaseOrderReceptions] = React.useState<
    IPurchaseOrderReception[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    validateSession();
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await purchaseOrderReceptionAPI.getAll();
      if (response?.success) {
        setPurchaseOrderReceptions(response.content);
      } else {
        toast.error(response?.message || "Ocurrio un error");
      }
      setLoading(false);
    })();
  }, []);

  const renderCell = (
    item: IPurchaseOrderReception,
    columnKey: keyof IPurchaseOrderReceptionTableCell | "actions"
  ) => {
    let cellValue = "";
    
    if (columnKey != "actions") {
      cellValue = item[columnKey];
    }


    switch (columnKey) {
      case "grocer":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? cellValue : "Nadie"}
            </p>
          </div>
        );
      case "createdDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue === "" ? "No registrado" : Utils.formatDate(cellValue)}
            </p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );
      case "reviewDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );

      case "completedDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? Utils.formatDate(cellValue) : "No registrado"}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            size="lg"
            variant="flat"
            title={cellValue}
            color={
              cellValue === "PENDIENTE"
                ? "warning"
                : cellValue === "EN_PROCESO"
                ? "danger"
                : "success"
            }
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return item.purchaseOrderStatus !== "CANCELADA" ? ((item.grocerId === user.roleExtraData?.id &&
          item.status !== "PENDIENTE") ||
          isAdmin ? (
          <Button
            className="text-white"
            isDisabled={ user.roleExtraData?.status !== "DISPONIBLE" }
            color={item.status === "COMPLETADO" ? "success" : "danger"}
            onClick={() => router.push("/admin/purchase/reception/" + item.id)}
          >
            {item.status !== "COMPLETADO"
              ? isAdmin
                ? "Iniciar Proceso"
                : "Continuar Proceso"
              : "Completado"}
          </Button>
        ) : item.status !== "PENDIENTE" &&
          item.status !== "COMPLETADO" ? (
          <Button
            className="text-white"
            color="primary"
            onClick={() => router.push("/admin/purchase/reception/" + item.id)}
            isDisabled={true}
          >
            En proceso
          </Button>
        ) : (
          <Button
            className="text-white"
            color={`${
              item.status === "COMPLETADO" ? "warning" : "primary"
            }`}
            onClick={() => {
              if (item.status !== "COMPLETADO") {
                handleStartReception(item.id, item.purchaseOrderId);
                console.log("faaaaaa");
              } else {
                router.push("/admin/purchase/reception/" + item.id)
              }
            }}
            isDisabled={
              item.status === "COMPLETADO"
              ? false
              : user.roleExtraData
              ? (user.roleExtraData as IGrocer).status !== "DISPONIBLE"
              : false
            }
          >
            {item.status !== "COMPLETADO"
              ? "Iniciar Proceso"
              : "Completado"}
          </Button>
        ))
        : <Button isDisabled color="danger">Cancelado</Button>;
      default:
        return <>{cellValue}</>;
    }
  };

  const handleStartReception = async (id: string, purchaseId: string) => {
    const response = await purchaseOrderReceptionAPI.startOrderReception( id, purchaseId,  user.roleExtraData ? user.roleExtraData.id : "");
    if (response?.success) {
      toast.success(response.message);
      loadPurchaseOrders();
      router.push("/admin/purchase/reception/" + id)
    } else {
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">
        Pedidos Pendientes a Recepcionar
      </h1>
      <Table
        aria-label="Example table with client side pagination"
        isStriped
        isCompact
        border={2}
        topContentPlacement="outside"
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          {columns.map((c) => (
            <TableColumn key={c.key}>{c.title}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={loading}
          emptyContent={"Aun no haz realizado pedidos."}
          items={purchaseOrderReceptions}
        >
          {(order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    order,
                    columnKey as keyof IPurchaseOrderReception
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
