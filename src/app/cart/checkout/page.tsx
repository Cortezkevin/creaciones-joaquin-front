"use client";

import { OrderDetail } from "@/components/OrderDetail";
import { OrderDetailSummary } from "@/components/OrderDetailSummary";
import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as yup from "yup";
import React from "react";

type ExtraData = {
  phone: string;
  specificAddress: string;
  note: string;
};

const phoneSchema = yup
  .string()
  .matches(/^9\d{8}$/, "Ingrese un numero valido")
  .required("Ingrese un numero de telefono");

export default function Checkout() {
  const router = useRouter();
  const { user, isSavingProfile, onUpdateProfile } =
    React.useContext(AuthContext);
  const { shippingCost, count, subtotal, total, tax, discount, items } =
    React.useContext(CartContext);

  const [phoneTouched, setPhoneTouched] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState("");
  const [isValidPhone, setIsValidPhone] = React.useState(false);
  const [extraData, setExtraData] = React.useState<ExtraData>({
    phone: user.profile.phone || "",
    specificAddress: "",
    note: "",
  });

  const handleChange = (dataName: keyof ExtraData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setExtraData((prev) => ({ ...prev, [dataName]: e.target.value }));
    };
  };

  const handleConfirmOrder = async () => {
    if (extraData.phone !== "") {
      Cookies.set(
        "extraOrderData",
        JSON.stringify({
          specific: extraData.specificAddress,
          note: extraData.note,
        })
      );
      const result = await onUpdateProfile({
        userId: user.id,
        birthdate: user.profile.birthDate,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: extraData.phone,
      });
      if( result ){
        router.push("/cart/checkout/confirm");
      }
    }
  };

  React.useEffect(() => {
    if( user ){
      if( user.profile.phone.length > 0 ){
        setIsValidPhone( true );
      }
      setExtraData(prev => ({ ...prev, phone: user.profile.phone }));
    }
  },[ user ])

  React.useEffect(() => {
    if (phoneTouched) {
      validatePhone();
    }
  }, [extraData.phone]);

  const validatePhone = () => {
    phoneSchema
      .validate(extraData.phone)
      .then((p) => {
        setIsValidPhone(true);
      })
      .catch((e) => {
        if (phoneTouched) {
          setPhoneError(e.message);
        }
        setIsValidPhone(false);
      });
  };

  return (
    <div className="flex flex-col w-full p-6 gap-10 mb-5">
      <h1 className="text-center text-2xl font-semibold">
        Detalles del pedido
      </h1>
      <div className="flex w-full gap-10 justify-center">
        <div className="flex flex-col w-[500px] gap-4 items-center">
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion del Usuario</h2>
            <div className="flex flex-col gap-2">
              <Input
                isRequired
                label="Nombre Completo"
                value={user.firstName + " " + user.lastName}
                readOnly
              />
              <Input
                isRequired
                label="Corre Electronico"
                value={user.email}
                readOnly
              />
              <Input
                isRequired
                label="Telefono"
                value={extraData.phone}
                type="text"
                maxLength={9}
                errorMessage={phoneError}
                isInvalid={!isValidPhone && phoneTouched}
                onFocus={() => setPhoneTouched(true)}
                onBlur={validatePhone}
                onChange={handleChange("phone")}
                readOnly={user.profile.phone !== ""}
              />
            </div>
          </div>
          <form className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion del Envio</h2>
            <div className="flex flex-col gap-2">
              <Input
                isRequired
                label="Direccion de Entrega"
                value={user.profile.address?.fullAddress}
                readOnly
              />
              <Input
                isRequired
                label="Costo de Envio"
                value={"S/. " + shippingCost}
                readOnly
              />
              <div className="flex flex-col gap-2">
                <Textarea
                  label="Especificar Direccion"
                  value={extraData.specificAddress}
                  onChange={handleChange("specificAddress")}
                  placeholder="Agrega informacion adicional sobre tu direccion de entrega..."
                />
              </div>
            </div>
          </form>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion Adicional</h2>
            <div>
              <Textarea
                label="Comentario"
                value={extraData.note}
                onChange={handleChange("note")}
                placeholder="Escribe un comentario adicional..."
              />
            </div>
          </div>
        </div>
        <div className="w-[700px] h-[300px] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold p-2">Informacion de la compra</h2>
            <Button size="sm" color="secondary" variant="bordered">
              Editar Compra
            </Button>
          </div>
          <div className="flex flex-col gap-2 ">
            {items.map((i) => (
              <OrderDetail key={i.id} {...i} />
            ))}
          </div>
          <OrderDetailSummary
            count={count}
            subtotal={subtotal}
            tax={tax}
            discount={discount}
            total={total}
            shippingCost={shippingCost}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={handleConfirmOrder}
          isDisabled={!isValidPhone}
          isLoading={isSavingProfile}
          size="lg"
          color="primary"
          className="text-white"
        >
          Confirmar y Pagar
        </Button>
      </div>
    </div>
  );
}
