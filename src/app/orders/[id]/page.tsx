"use client";

import { orderAPI } from "@/api";
import { NavbarUI } from "@/components/NavbarUI";
import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { IDetailedOrder, IOrder } from "@/declarations";
import { Image } from "@nextui-org/image";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { useRouter } from "next/navigation";
import { OrderDetail } from "@/components/OrderDetail";
import { OrderDetailSummary } from "@/components/OrderDetailSummary";
import Cookies from "js-cookie";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isLogged } = React.useContext(AuthContext);
  const [order, setOrder] = React.useState<IDetailedOrder | undefined>();

  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get("token");
    if (!token || token.length < 0) {
      router.push("/auth/login?prevPage=/orders/" + params.id);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const response = await orderAPI.getDetailedOrder(params.id);
      if (response?.success) {
        setOrder(response.content);
      }
    })();
  }, []);

  if (!order)
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );

  return (
    <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
      <div className="w-[1200px] flex flex-col gap-8">
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <h1>Detalle del Pedido</h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                order.status === "PENDIENTE"
                  ? "warning"
                  : order.status === "EN_PROCESO" || order.status === "ENTREGADO"
                  ? "success"
                  : "danger"
              }
            >
              {order.status}
            </Chip>
          </div>
        </div>
        {/* <div className="w-full flex p-4 items-center justify-center bg-red-300">
          STEPPER
        </div> */}
        <div className="flex gap-6  justify-center min-h-[300px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg w-[800px] bg-white">
              <h3 className="text-lg font-semibold">Productos Comprados</h3>
              {order.orderDetails.map((od) => (
                <OrderDetail key={od.id} {...od} modeSoloImage={true} />
              ))}
            </div>
            <div className="w-full min-h-[200px] bg-white p-4 shadow-lg rounded-lg">
              <OrderDetailSummary
                count={order.orderDetails.length}
                subtotal={order.subtotal}
                tax={order.tax}
                discount={order.discount}
                total={order.total}
                shippingCost={order.shippingCost}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">
                Informacion de la Entrega
              </h3>
              <div className="flex flex-col gap-2">
                <Input
                  label="Nombre del Transportador"
                  value={ (order.shipping && order.shipping.carrier ) ? order.shipping.carrier.fullName : "Aun no empieza el envio" }
                  isReadOnly
                />
                {
                  order.shipping && order.shipping.carrier &&
                  <Input
                    label="Telefono de Contacto"
                    value={ order.shipping.carrier.phone }
                    isReadOnly
                  />
                }
                <Input
                  label="Direccion de Entrega"
                  value={ order.shippingAddress }
                  isReadOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">Informacion Adicional</h3>
              <div className="flex flex-col gap-2">
                <Textarea
                  label="Nota"
                  value={ order.note }
                  isReadOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">Acciones</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={order.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full text-white"
                  >
                    Ver Factura
                  </Button>
                </a>
                <Button
                  color="danger"
                  size="lg"
                  className="w-full"
                  isDisabled={
                    order.shipping ? (order.shipping.status === "EN_TRANSITO" || order.shipping.status === "ENTREGADO") : false ||
                    order.status !== "PENDIENTE"
                  }
                >
                  Anular Pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
