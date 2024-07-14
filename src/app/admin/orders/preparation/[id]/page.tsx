"use client";

import { orderAPI } from "@/api";
import { IDetailedPreparationOrder } from "@/declarations";
import { Button, Chip, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { OrderDetail } from "@/components/OrderDetail";
import { AuthContext } from "@/context/auth";
import toast from "react-hot-toast";
import { Utils } from "@/utils";
import { OrderContext } from "@/context";
import * as yup from "yup";
import { useFormik } from "formik";
import { WarehouseContext } from "@/context/admin/warehouse";

type PurchaseOrderFormInputs = {
  observations: string;
  warehouse: string;
};

const schema = yup.object().shape({
  observations: yup.string().required("Campo requerido"),
  warehouse: yup.string().required("Campo requerido")
});


export default function OrderPreparationPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = React.useContext(AuthContext);
  const { loadOrders } = React.useContext(OrderContext);
  const { warehouse: { warehouses } } = React.useContext(WarehouseContext);

  const [orderPreparation, setOrderPreparation] = React.useState<
    IDetailedPreparationOrder | undefined
  >();

  const {
    values,
    isValid,
    handleBlur,
    handleChange,
    errors,
    setErrors,
    setFieldValue,
    resetForm,
    touched,
  } = useFormik<PurchaseOrderFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      observations: "",
      warehouse: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    (async () => {
      const response = await orderAPI.getPreparationOrder(params.id);
      if (response?.success) {
        setOrderPreparation(response.content);
      }
    })();
  }, []);

  if (!orderPreparation) {
    return (
      <div className="w-[100vw] min-h-[450px] flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );
  }

  const handleContinueProccess = () => {
    switch (orderPreparation.status) {
      case "EN_PREPARACION":
        (async () => {
          const response = await orderAPI.checkPackagingPreparationOrder({
            preparationOrderId: orderPreparation.id,
          });
          if (response?.success) {
            toast.success(response.message);
            setOrderPreparation({
              ...orderPreparation,
              preparedDate: response.content.preparedDate,
              status: response.content.status,
            });
            loadOrders();
          }
        })();
        return;
      case "EN_EMPAQUETADO":
        (async () => {
          const response = await orderAPI.completePreparationOrder({
            orderPreparationId: orderPreparation.id,
            observations: values.observations,
            warehouse: values.warehouse
          });
          if (response?.success) {
            toast.success(response.message);
            setOrderPreparation({
              ...orderPreparation,
              completedDate: response.content.completedDate,
              status: response.content.status,
            });
            loadOrders();
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
            Proceso de Preparacion del Pedido:
            <p className="text-primary">#{orderPreparation.order.id}</p>
          </h1>
          <div className="flex gap-4">
            <p>Estado:</p>
            <Chip
              variant="flat"
              size="lg"
              color={
                orderPreparation.status === "EN_PREPARACION"
                  ? "warning"
                  : orderPreparation.status === "LISTO_PARA_RECOGER"
                  ? "success"
                  : "danger"
              }
            >
              {orderPreparation.status}
            </Chip>
          </div>
        </div>
        <div className="flex gap-1">
          <h3>
            {orderPreparation.status === "LISTO_PARA_RECOGER"
              ? "Completado por:"
              : "A cargo del empleado: "}
          </h3>
          <p className="font-semibold">
            {orderPreparation.order.preparation.grocer.fullName}
          </p>
        </div>
        <div className="w-full flex flex-col p-4 items-center justify-center gap-4 ">
          <h3 className="text-lg font-semibold">Control de Tiempos</h3>
          <div className="flex gap-4">
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Creacion
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderPreparation.createdDate)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Inicio
              <p className="text-lg font-semibold">
                {Utils.formatDate(orderPreparation.startDate)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Preparacion
              <p className="text-lg font-semibold">
                {orderPreparation.preparedDate
                  ? Utils.formatDate(orderPreparation.preparedDate)
                  : "No Registrado"}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
              Fecha de Finalizacion
              <p className="text-lg font-semibold">
                {orderPreparation.completedDate
                  ? Utils.formatDate(orderPreparation.completedDate)
                  : "No Registrado"}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-[300px] flex xl:flex-row md:flex-col gap-6 justify-center min-h-[300px]">
          <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg bg-white">
            <h3 className="text-lg font-semibold">Informacion del Cliente</h3>
            <div className="flex flex-col gap-2">
              <Input
                label="Nombre del Cliente"
                value={orderPreparation.order.user.fullName}
                isReadOnly
              />
              <Input
                label="Email"
                value={orderPreparation.order.user.email}
                isReadOnly
              />
              <Input
                label="Numero de Telefono"
                value={orderPreparation.order.user.phone}
                isReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-4 shadow-lg rounded-lg w-[350px] bg-white">
              <h3 className="text-lg font-semibold">Productos a Preparar</h3>
              {orderPreparation.order.orderDetails.map((od) => (
                <OrderDetail key={od.id} {...od} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">Informacion Adicional</h3>
              <div className="flex flex-col gap-2">
                <Textarea
                  label="Nota"
                  value={orderPreparation.order.note}
                  isReadOnly
                />
              </div>
            </div>
          </div>
        </div>
        {
          orderPreparation.status === "EN_EMPAQUETADO" &&
          (
            <div className="flex flex-col gap-4 w-[400px] p-4 shadow-lg rounded-lg bg-white">
              <h3 className="text-lg font-semibold">Informacion del retiro</h3>
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  onChange={handleChange("observations")}
                  onBlur={handleBlur("observations")}
                  value={values.observations}
                  label="Observaciones"
                  isInvalid={!!errors.observations && touched.observations}
                  errorMessage={touched.observations && errors.observations}
                  variant="bordered"
                />
                <Select
                  isRequired
                  items={warehouses}
                  label="Almacen"
                  variant="bordered"
                  onChange={handleChange("warehouse")}
                  onBlur={handleBlur("warehouse")}
                  value={values.warehouse}
                  isInvalid={
                    !!errors.warehouse && touched.warehouse
                  }
                  errorMessage={
                    touched.warehouse && errors.warehouse
                  }
                >
                  {(warehouse) => (
                    <SelectItem value={warehouse.id} key={warehouse.id}>
                      {warehouse.location}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
          )
        }
        <Button
          isDisabled={
            orderPreparation.order.status === "ANULADO" ||
            orderPreparation.status === "LISTO_PARA_RECOGER" ||
            ( orderPreparation.status === "EN_EMPAQUETADO" && !isValid )
          }
          color="primary"
          size="lg"
          className="w-[400px] text-white"
          onClick={handleContinueProccess}
        >
          {orderPreparation.status !== "LISTO_PARA_RECOGER"
            ? orderPreparation.status === "EN_PREPARACION"
              ? "Empaquetar"
              : "Completar"
            : "Proceso Completado"}
        </Button>
      </div>
    </div>
  );
}
