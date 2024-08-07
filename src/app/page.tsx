"use client";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";
import { NavbarUI } from "@/components/NavbarUI";
import { ProductCard } from "@/components/ProductCard";
import { ShopContext } from "@/context/shop";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/react";
import React from "react";

export default function Home() {

  const { categories, products } = React.useContext( ShopContext );

  return (
    <main className=" bg-slate-100">
      <NavbarUI />
      <div className="w-full bg-primary-200 flex items-center justify-center min-h-[400px] h-auto bg-slate-200">
        <Image
          width={1800}
          height={500}
          alt="NextUI hero Image with delay"
          src="https://colineal.pe/cdn/shop/files/PORTADA-TEMP-COMEDORES-WEB-PE07.2024_2000x.jpg?v=1720103739"
        />
      </div>
      <div className="flex flex-col gap-4 mt-[40px] justify-center items-center pb-12">
        <div className="w-full flex flex-col gap-6 items-center justify-center">
          <h1 className="text-lg font-semibold">Categorias</h1>
          <div className="flex flex-wrap w-full gap-4 items-center justify-center min-h-[300px]">
            {
              categories.loading
              ? <Spinner label="Cargando..." size="lg" color="warning" />
              : categories.data
              && categories.data.map( c => 
                (
                  <CategoryCard key={c.id} category={ c } />
                )
              )
            }
          </div>
        </div>
        <div className="max-w-[1400px] w-[1200px] flex flex-col gap-6 items-center justify-center min-h-[300px]">
          <h1 className="text-lg font-semibold">Productos</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {
              products.loading
              ? <Spinner label="Cargando..." size="lg" color="warning" />
              : products.data
              && products.data.map( p => 
                (
                  <ProductCard key={p.id} product={ p} />
                )
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
