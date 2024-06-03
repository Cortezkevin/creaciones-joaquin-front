"use client";

import { categoryAPI, productAPI } from "@/api";
import { CategoryCard } from "@/components/CategoryCard";
import { NavbarUI } from "@/components/NavbarUI";
import { ProductCard } from "@/components/ProductCard";
import { ICategory, IProduct } from "@/declarations";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/react";
import React from "react";

export default function Home() {

  const [isLoadingProducts, setIsLoadingProducts] = React.useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);

  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    ( async () => {
      setIsLoadingProducts( true );
      setIsLoadingCategories( true );
      const productsResponse = await productAPI.getAll();
      const categoriesResponse = await categoryAPI.getAll();
      if(productsResponse?.success){
        setProducts( productsResponse.content );
        setIsLoadingProducts( false );
      }
      if(categoriesResponse?.success){
        setCategories( categoriesResponse.content );
        setIsLoadingCategories( false );
      }
    })();
  }, [])

  return (
    <main className="pb-[100px] bg-red-100">
      <NavbarUI />
      <div className="w-full bg-primary-200 flex items-center justify-center min-h-[750px] h-auto bg-slate-200">
        <Image
          width={1750}
          height={600}
          alt="NextUI hero Image with delay"
          src="https://colineal.pe/cdn/shop/files/AF6C577C-85F8-452F-A865-2D8C9932C86C_2000x.jpg?v=1714842610"
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="w-full p-6 flex flex-col gap-6 items-center">
          <h1 className="text-lg font-semibold">Categorias</h1>
          <div className="flex flex-wrap w-full gap-4 items-center justify-center min-h-[300px]">
            {
              isLoadingCategories
              ? <Spinner label="Cargando..." size="lg" color="warning" />
              : categories
              && categories.map( c => 
                (
                  <CategoryCard key={c.id} category={ c } />
                )
              )
            }
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 items-center justify-center min-h-[300px]">
          <h1 className="text-lg font-semibold">Productos</h1>
          <div className="flex justify-center gap-4">
            {
              isLoadingProducts
              ? <Spinner label="Cargando..." size="lg" color="warning" />
              : products 
              && products.map( p => 
                (
                  <ProductCard key={p.id} product={ p} />
                )
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
}
