"use client";

import { getOrdersByUser } from "@/api/orderAPI";
import { AuthContext } from "@/context/auth";
import {
  IOrder,
  IOrderTableCell,
  IOrderTableColumn,
  OrderStatus,
} from "@/declarations";
import { Utils } from "@/utils";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const columns: IOrderTableColumn[] = [
  {
    key: "user",
    title: "Cliente",
  },
  {
    key: "shippingAddress",
    title: "Direccion de Envio",
  },
  {
    key: "paymentMethod",
    title: "Metodo de Pago",
  },
  {
    key: "total",
    title: "Total",
  },
  {
    key: "createdDate",
    title: "Fecha de Creacion",
  },
  {
    key: "status",
    title: "Estado del Pedido",
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (user.id !== "") {
      (async () => {
        const response = await getOrdersByUser(user.id);
        if (response?.success) {
          setOrders(response.content);
        }
      })();
    }
  }, [user.id]);

  const renderCell = React.useCallback(
    (item: IOrderTableCell, columnKey: keyof IOrderTableCell | "actions") => {
      let cellValue = "";
      if (columnKey != "actions") {
        cellValue = item[columnKey];
      }
      
      switch (columnKey) {
        case "user":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "shippingAddress":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "paymentMethod":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "total":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "createdDate":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{Utils.formatDate(cellValue)}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              size="lg"
              variant="flat"
              title={cellValue}
              color={
                (cellValue as OrderStatus) === "PENDIENTE"
                  ? "warning"
                  : (cellValue as OrderStatus) === "EN_PROCESO" || (cellValue as OrderStatus) === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Ver Detalles">
                <span
                  className="text-lg text-warning cursor-pointer active:opacity-50"
                  onClick={() => router.push("/orders/" + item.id)}
                >
                  <i className="fa-solid fa-eye"></i>
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
    <div className="w-[100vw] min-h-[400px] flex flex-col gap-4 items-center justify-start p-8">
      <h1 className="text-xl font-semibold">Historial de Pedidos</h1>
      <div className="w-[1400px] min-h-[200px] flex flex-col items-center justify-center p-4 gap-4">
        <Table
          aria-label="Example table with client side pagination"
          isStriped
          isCompact
          border={2}
          /*         topContent={topContent} */
          topContentPlacement="outside"
          /*         bottomContent={bottomContent} */
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
            /*           isLoading={ isLoading } */
            emptyContent={"Aun no haz realizado pedidos."}
            items={orders}
          >
            {(order) => (
              <TableRow key={order.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(order, columnKey as keyof IOrderTableCell)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
