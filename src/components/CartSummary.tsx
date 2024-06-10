import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { Button, Chip, Divider, Input, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AddressModal } from "./AddressModal";
import { IAddress } from "@/declarations";
import Cookies from 'js-cookie';

export const CartSummary = () => {
  const router = useRouter();
  const { isLogged, user, isSavingAddress } = React.useContext(AuthContext);
  const { total, discount, count, subtotal, tax, shippingCost } = React.useContext(CartContext);
  const [showSummary, setShowSummary] = useState(false);
  const [direction, setDirection] = useState<IAddress | undefined>(user.profile.address);

  const [openModal, setOpenModal] = useState(false);

  React.useEffect(() => {
    if( user.profile.address ){
      setDirection(user.profile.address);
    }else {
      const address = JSON.parse( Cookies.get("address") || "null" ) as IAddress;
      if( address ){
        setDirection(address);
      }else {
        setDirection(undefined);
      }
    }
    
  }, [user]);

  const handleCheckout = () => {
    if (!isLogged) {
      toast.error(
        "Debes tener una cuenta para realizar compras, por favor crea una para continuar o inicia sesion si ya tienes una"
      );
      router.push("/auth/login?prevPage=/cart");
    } else {
      router.push("/cart/checkout");
    }
  };

  return (
    <div
      className={`lg:w-[30%] bg-orange-100 p-4 lg:p-10 flex flex-col gap-8 lg:static absolute w-[350px] top-50px ${
        showSummary ? "right-0" : "right-[-350px]"
      } transition-all duration-300 shadow-xl`}
    >
      <div className={`lg:hidden block relative mt-[-40px]`}>
        <Button
          color="primary"
          size="sm"
          className="w-[20px] text-wrap absolute  text-ms left-[-80px] top-[40px] rounded-none"
          onClick={() => setShowSummary(!showSummary)}
        >
          <i className="fa-solid fa-list text-white"></i>
        </Button>
      </div>
      <h2 className="text-lg font-semibold">Resumen del Carrito</h2>
      <form className="flex flex-col gap-4">
        <h2 className="text-md font-semibold">Direccion de Entrega</h2>
        <div className="flex flex-col gap-2">
          <Input
            multiple
            label="Direccion"
            value={ direction && direction !== null ? direction.fullAddress : ""}
            readOnly
            startContent={<i className="fa-solid fa-location-dot"></i>}
          />
          <Button color="primary" className="text-white rounded-md" onClick={() => setOpenModal(true)} isLoading={isSavingAddress}>
            { direction && direction !== null ? "Cambiar direccion" : "Agregar Direccion" }
          </Button>
        </div>
        <AddressModal isOpen={ openModal } handleOpenModal={(isOpen) => setOpenModal(isOpen)} />
      </form>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-sm">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-money-bill"></i>
            <p>Subtotal ({count} items)</p>
          </span>
          <span>S/ {subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-[500] flex gap-3 items-center">
            <Tooltip placement="bottom-start" size="sm" content="¡Compras mayores a S/. 2500 cuentan con envio gratis!" color="default">
              <i className="fa-solid fa-truck-fast"></i>
            </Tooltip>
            <p>Precio de Entrega</p>
          </span>
          {
            parseFloat(subtotal) > 2500 
            ? (
                <Chip color="success" variant="flat">
                  FREE
                </Chip>
            )
            : (
              <span>S/ { shippingCost }</span>
            )
          }
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-percent"></i>
            <p>Impuestos</p>
          </span>
          <span>S/ {tax}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-tag"></i>
            <p>Descuento</p>
          </span>
          <span>- S/ {discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-[500] flex gap-3 items-center">
            <i className="fa-solid fa-money-bill"></i>
            <p>Total parcial</p>
          </span>
          <span>S/ {subtotal}</span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between text-lg font-semibold">
        <span className="flex gap-3 items-center">
          <i className="fa-solid fa-money-check-dollar"></i>
          <p>Total</p>
        </span>
        <span>S/ {total}</span>
      </div>
      <Button
        onClick={handleCheckout}
        isDisabled={count === 0 || ( user.profile.address && (user.profile.address === undefined || user.profile.address.fullAddress === "")) }
        size="lg"
        className="w-full text-white font-semibold rounded-md"
        color="primary"
        variant="solid"
      >
        Continuar al pedido
      </Button>
    </div>
  );
};
