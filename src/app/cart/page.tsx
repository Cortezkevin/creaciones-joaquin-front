"use client";

import { CartSummary } from "@/components/CartSummary";
import { NormalCartItem } from "@/components/NormalCartItem";
import { CartContext } from "@/context/cart";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Cart() {

  const router = useRouter();
  const { count, items } = React.useContext( CartContext );

  return (
    <div className="flex h-full w-full relative overflow-hidden min-h-[650px]">
      <div className="lg:w-[70%] w-full p-4 lg:py-5 lg:px-10 overflow-auto">
        <div className='p-4'>
          <h1 className='font-semibold text-2xl'>Tu carrito - ({ count } item{ count > 1 ? "s" : ""})</h1>
        </div>
        <div className='p-2 lg:p-4 flex flex-col gap-6 lg:gap-8'>
          {
            items.length === 0
            ? (
              <div className="flex flex-col gap-4 items-center justify-center text-xl h-[400px]">
                No tienes items en tu carrito
                <Button onClick={() => router.push("/")} className="hover:text-white" color="primary" variant="ghost">Agregar items</Button>
              </div>
            )
            : items.map(i => (
              <NormalCartItem key={i.id} item={ i }/>
            ))
          }
        </div>
      </div>
      <CartSummary />
    </div>
  );
}