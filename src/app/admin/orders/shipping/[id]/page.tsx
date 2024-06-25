"use client";

import { orderAPI } from "@/api";
import {
  IDetailedShippingOrder,
} from "@/declarations";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { OrderDetail } from "@/components/OrderDetail";
import { AuthContext } from "@/context/auth";
import toast from "react-hot-toast";
import { OrderContext } from "@/context/admin";
import { Utils } from "@/utils";

export default function OrderShippingPage({
  params,
}: {
  params: { id: string };
}) {
  const { validateSession } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(OrderContext);

  const [orderShipping, setOrderShipping] = React.useState<
    IDetailedShippingOrder | undefined
  >();

  React.useEffect(() => {
    validateSession();
  },[]);

  React.useEffect(() => {
    (async () => {
      const response = await orderAPI.getShippingOrder(params.id);
      if (response?.success) {
        setOrderShipping(response.content);
      }
    })();
  }, []);

  if (!orderShipping) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleContinueProccess = () => {
    switch (orderShipping.status) {
      case "EN_PREPARACION":
        (async () => {
          const response = await orderAPI.checkPrepareShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            toast.success(response.message);
            setOrderShipping({
              ...orderShipping,
              preparedDate: response.content.preparedDate,
              status: response.content.status,
            });
            loadOrders();
          }
        })();
        return;
      case "PREPARADO":
        (async () => {
          const response = await orderAPI.checkTransitShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            toast.success(response.message);
            setOrderShipping({
              ...orderShipping,
              shippingDate: response.content.shippingDate,
              status: response.content.status,
            });
            loadOrders();
          }
        })();
        return;
      case "EN_TRANSITO":
        (async () => {
          const response = await orderAPI.completeShippingOrder({
            orderShippingId: orderShipping.id,
          });
          if (response?.success) {
            toast.success(response.message);
            setOrderShipping({
              ...orderShipping,
              completedDate: response.content.completedDate,
              status: response.content.status,
            });
            loadOrders();
          } else {
            toast.error(response?.message || "Ocurrio un error");
          }
        })();
        return;
      default: {
        return;
      }
    }
  };

  return (
    <div className="w-full p-8 flex items-center justify-center overflow-auto">
      <div className="min-w-[300px] w-full flex flex-col gap-6 items-center justify-center">
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <h1 className=" flex gap-2">
            Proceso de Entrega del Pedido:
            <p className="text-primary">#{orderShipping.order.id}</p>
          </h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                orderShipping.status === "EN_PREPARACION"
                  ? "warning"
                  : orderShipping.status === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {orderShipping.status}
            </Chip>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-1">
            <h3>Preparado por: </h3>
            <p className="font-semibold">{orderShipping.preparedBy}</p>
          </div>
          <div className="flex gap-1">
            <h3>
              {orderShipping.status === "ENTREGADO"
                ? "Completado por:"
                : "A cargo del empleado: "}
            </h3>
            <p className="font-semibold">
              {orderShipping.order.shipping.carrier.fullName}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col p-4 items-center justify-center gap-4 ">
          <h3 className="text-lg font-semibold">Control de Tiempos</h3>
          <div className="flex gap-4">
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Creacion
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderShipping.createdDate)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Inicio
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderShipping.startDate)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Preparacion
              <p className="text-lg font-semibold">
                {orderShipping.preparedDate
                  ? Utils.formatDate(orderShipping.preparedDate)
                  : "No Registrado"}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Envio
              <p className="text-lg font-semibold">
                {orderShipping.shippingDate
                  ? Utils.formatDate(orderShipping.shippingDate)
                  : "No Registrado"}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Finalizacion
              <p className="text-lg font-semibold">
                {orderShipping.completedDate
                  ? Utils.formatDate(orderShipping.completedDate)
                  : "No Registrado"}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[300px] flex xl:flex-row md:flex-col gap-6 justify-center min-h-[300px]">
          <div className="flex flex-col gap-4 w-[330px] p-4 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Informacion del Cliente</h3>
            <div className="flex flex-col gap-2">
              <Input
                label="Nombre del Cliente"
                value={orderShipping.order.user.fullName}
                isReadOnly
              />
              <Input
                label="Email"
                value={orderShipping.order.user.email}
                isReadOnly
              />
              <Input
                label="Numero de Telefono"
                value={orderShipping.order.user.phone}
                isReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[330px] p-4 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Informacion del Envio</h3>
            <div className="flex flex-col gap-2">
              <Input
                label="Direccion de Entrega"
                value={orderShipping.order.shippingAddress}
                isReadOnly
              />
              <Input
                label="Direccion Especifica"
                value={orderShipping.order.specificAddress}
                isReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg w-[350px] bg-white">
              <h3 className="text-lg font-semibold">
                Productos listos para recoger
              </h3>
              {orderShipping.order.orderDetails.map((od) => (
                <OrderDetail key={od.id} {...od} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-[330px] p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">Informacion Adicional</h3>
              <div className="flex flex-col gap-2">
                <Textarea
                  label="Nota"
                  value={orderShipping.order.note}
                  isReadOnly
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          isDisabled={
            orderShipping.order.status === "ANULADO" ||
            orderShipping.status === "ENTREGADO"
          }
          color="primary"
          size="lg"
          className="w-[400px] text-white"
          onClick={handleContinueProccess}
        >
          {orderShipping.status !== "ENTREGADO"
            ? orderShipping.status === "EN_PREPARACION"
              ? "Preparado"
              : orderShipping.status === "PREPARADO" 
              ? "Iniciar Recorrido"
              : "Completar"
            : "Proceso Completado"}
        </Button>
      </div>
    </div>
  );
}
