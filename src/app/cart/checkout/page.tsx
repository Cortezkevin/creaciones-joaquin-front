"use client";

import { NormalCartItem } from "@/components/NormalCartItem";
import { OrderDetail } from "@/components/OrderDetail";
import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";
import React from "react";

export default function Checkout() {
  const { user } = React.useContext( AuthContext );
  const { shippingCost, count, subtotal, total, tax, discount, items } = React.useContext( CartContext );
  return (
    <div className="flex flex-col w-full p-6 gap-8 mb-5">
      <h1 className="ml-[330px] text-2xl font-semibold">Detalles del pedido</h1>
      <div className="flex w-full gap-8 justify-center">
        <div className="flex flex-col w-[400px] gap-4 items-center">
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion del Usuario</h2>
            <div className="flex flex-col gap-2">
              <Input label="Nombre Completo" value={ user.firstName + " " + user.lastName } readOnly />
              <Input label="Corre Electronico" value={ user.email } readOnly />
              <Input label="Telefono" value={ user.profile.phone } readOnly={ user.profile.phone !== "" } />
            </div>
          </div>
          <form className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion del Envio</h2>
            <div className="flex flex-col gap-2">
              <Input label="Direccion de Entrega" value={ user.profile.address?.fullAddress } readOnly/>
              <Input label="Costo de Envio" value={ "S/. " + shippingCost } readOnly />
              <div className="flex flex-col gap-2">
                <Textarea label="Especificar Direccion" />
                <Button size="sm" color="primary" isDisabled className="text-white">Confirmar</Button>
              </div>
            </div>
          </form>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-semibold p-2">Informacion Adicional</h2>
            <div>
              <Textarea label="Comentario" placeholder="Escribe un comentario adicional ..."/>
            </div>
          </div>
        </div>
        <div className="w-[600px] h-[300px] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold p-2">Informacion de la compra</h2>
            <Button size="sm" color="secondary" variant="bordered">Editar Compra</Button>
          </div>
          <div className="flex flex-col gap-2 ">
            {
              items.map( i => 
                <OrderDetail key={i.id} item={i} />
              )
            }
          </div>
          <div>
            <h2 className="font-semibold p-2">Resumen de la Compra</h2>
            <div className="flex flex-col p-4 gap-2">
              <div className="flex justify-between">
                <span className="font-[500] flex gap-3 items-center">
                  <i className="fa-solid fa-money-bill"></i>
                  <p>Subtotal ({count} items)</p>
                </span>
                <span>S/ {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-[500] flex gap-3 items-center">
                  <i className="fa-solid fa-truck-fast"></i>
                  <p>Precio de Envio</p>
                </span>
                <span>S/ { shippingCost }</span>
              </div>
              <div className="flex justify-between">
                <span className="font-[500] flex gap-3 items-center">
                  <i className="fa-solid fa-percent"></i>
                  <p>Impuestos</p>
                </span>
                <span>S/ {tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-[500] flex gap-3 items-center">
                  <i className="fa-solid fa-tag"></i>
                  <p>Descuento</p>
                </span>
                <span>- S/ {discount}</span>
              </div>
              <Divider />
              <div className="flex justify-between">
                <span className="font-[500] flex gap-3 items-center">
                  <i className="fa-solid fa-money-bill"></i>
                  <p>Total</p>
                </span>
                <span>S/ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button isDisabled size="lg" color="primary" className="text-white">Confirmar y Pagar</Button>
      </div>
    </div>
  )
}