"use client";
import { orderAPI } from "@/api";
import { AdminContext } from "@/context/admin";
import { AuthContext } from "@/context/auth";
import {
  IShippingOrder,
  IShippingOrderTableCell,
  IShippingOrderTableColumn,
} from "@/declarations";
import { ICarrier } from "@/declarations/model/carrier";
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

const columns: IShippingOrderTableColumn[] = [
  {
    key: "orderId",
    title: "ID del Pedido",
  },
  {
    key: "preparedBy",
    title: "Preparado por",
  },
  {
    key: "carrier",
    title: "A cargo de",
  },
  {
    key: "address",
    title: "Direccion de Entrega",
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
    title: "Fecha de Preparado",
  },
  {
    key: "shippingDate",
    title: "Fecha de Envio",
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

export default function ShippingOrdersPage() {
  const router = useRouter();

  const { user, validateSession } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(AdminContext);

  const [shippingOrders, setShippingOrders] = React.useState<IShippingOrder[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    validateSession();
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await orderAPI.getAllShippingOrders();
      if (response?.success) {
        setShippingOrders(response.content);
      } else {
        toast.error(response?.message || "Ocurrio un error");
      }
      setLoading(false);
    })();
  }, []);

  const renderCell = (
    item: IShippingOrderTableCell,
    columnKey: keyof IShippingOrderTableCell | "actions"
  ) => {
    console.log("ITEM", { item });
    let cellValue = "";
    if (columnKey === "carrier") {
      cellValue = item["carrier"] ? item["carrier"].fullName : "Nadie";
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
      case "preparedBy":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "carrier":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue ? cellValue : "Nadie"}
            </p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "createdDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {Utils.formatDate(cellValue)}
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
      case "shippingDate":
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
        return item.userIdFromCarrier === user.id &&
          item.status !== "PENDIENTE" ? (
          <Button
            className="text-white"
            color={item.status === "ENTREGADO" ? "success" : "danger"}
            onClick={() => router.push("/admin/orders/shipping/" + item.id)}
          >
            {item.status !== "ENTREGADO" ? "Continuar Proceso" : "Completado"}
          </Button>
        ) : (
          <Button
            className="text-white"
            color="primary"
            onClick={() => handleStartPreparation(item.id, item.orderId)}
            isDisabled={
              item.status !== "PENDIENTE" ||
              (user.roleExtraData
                ? (user.roleExtraData as ICarrier).status !== "DISPONIBLE"
                : false)
            }
          >
            Iniciar Proceso
          </Button>
        );
      default:
        return <>{cellValue}</>;
    }
  };

  const handleStartPreparation = async (id: string, orderId: string) => {
    const response = await orderAPI.startShippingOrder({
      orderId,
      userId: user.id,
    });
    if (response?.success) {
      toast.success(response.message);
      loadOrders();
      router.push("/admin/orders/shipping/" + id);
    } else {
      toast.error(response?.message || "Ocurrio un error");
    }
  };

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto">
      <h1 className="text-large font-semibold">
        Pedidos Pendientes para Entregar
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
          items={shippingOrders}
        >
          {(order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    order,
                    columnKey as keyof IShippingOrderTableCell
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
