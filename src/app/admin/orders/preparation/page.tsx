"use client";
import { orderAPI } from "@/api";
import { AdminContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import {
  IPreparationOrder,
  IPreparationOrderTableCell,
  IPreparationOrderTableColumn,
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

const columns: IPreparationOrderTableColumn[] = [
  {
    key: "orderId",
    title: "ID del Pedido",
  },
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
    key: "preparedDate",
    title: "Fecha de Preparacion",
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

export default function PreparationOrdersPage() {
  const router = useRouter();

  const { user, isAdmin, validateSession } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(AdminContext);

  const [preparationOrders, setPreparationOrders] = React.useState<
    IPreparationOrder[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    validateSession();
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await orderAPI.getAllPreparationOrders();
      if (response?.success) {
        setPreparationOrders(response.content);
      } else {
        toast.error(response?.message || "Ocurrio un error");
      }
      setLoading(false);
    })();
  }, []);

  const renderCell = (
    item: IPreparationOrderTableCell,
    columnKey: keyof IPreparationOrderTableCell | "actions"
  ) => {
    let cellValue = "";
    if (columnKey === "grocer") {
      cellValue = item["grocer"] ? item["grocer"].fullName : "Nadie";
    } else {
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
    }

    switch (columnKey) {
      case "orderId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
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
      case "preparedDate":
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
        return (item.userIdFromGrocer === user.id &&
          item.status !== "PENDIENTE") ||
          isAdmin ? (
          <Button
            className="text-white"
            color={item.status === "LISTO_PARA_RECOGER" ? "success" : "danger"}
            onClick={() => router.push("/admin/orders/preparation/" + item.id)}
          >
            {item.status !== "LISTO_PARA_RECOGER"
              ? isAdmin
                ? "Iniciar Proceso"
                : "Continuar Proceso"
              : "Completado"}
          </Button>
        ) : item.status !== "PENDIENTE" &&
          item.status !== "LISTO_PARA_RECOGER" ? (
          <Button
            className="text-white"
            color="primary"
            onClick={() => router.push("/admin/orders/preparation/" + item.id)}
            isDisabled={true}
          >
            En proceso
          </Button>
        ) : (
          <Button
            className="text-white"
            color={`${
              item.status === "LISTO_PARA_RECOGER" ? "warning" : "primary"
            }`}
            onClick={() => {
              if (item.status !== "LISTO_PARA_RECOGER") {
                handleStartPreparation(item.id, item.orderId);
              } else {
                router.push("/admin/orders/preparation/" + item.id);
              }
            }}
            isDisabled={
              item.status === "LISTO_PARA_RECOGER"
              ? false
              : user.roleExtraData
              ? (user.roleExtraData as IGrocer).status !== "DISPONIBLE"
              : false
            }
          >
            {item.status !== "LISTO_PARA_RECOGER"
              ? "Iniciar Proceso"
              : "Completado"}
          </Button>
        );
      default:
        return <>{cellValue}</>;
    }
  };

  const handleStartPreparation = async (id: string, orderId: string) => {
    const response = await orderAPI.startPreparationOrder({
      orderId,
      userId: user.id,
    });
    if (response?.success) {
      toast.success(response.message);
      loadOrders();
      router.push("/admin/orders/preparation/" + id);
    } else {
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto">
      <h1 className="text-large font-semibold">
        Pedidos Pendientes para Preparar
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
          items={preparationOrders}
        >
          {(order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    order,
                    columnKey as keyof IPreparationOrderTableCell
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
