"use client";

import { productAPI } from "@/api";
import { Footer } from "@/components/Footer";
import { NavbarUI } from "@/components/NavbarUI";
import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { IProduct } from "@/declarations";
import { Image } from "@nextui-org/image";
import { Button, Chip, Divider, Spinner } from "@nextui-org/react";
import React from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isLogged } = React.useContext(AuthContext);
  const { onAddItem, id, isAddingItem, onAddMemoryItem } =
    React.useContext(CartContext);

  const [amount, setAmount] = React.useState(1);
  const [product, setProduct] = React.useState<IProduct | undefined>(undefined);

  const [imageSelected, setImageSelected] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const response = await productAPI.getById(params.id);
      if (response?.success) {
        setProduct(response.content);
        setImageSelected(response.content.images[0]);
      }
    })();
  }, []);

  const handleDecreaseAmount = () => {
    if (amount === 1) {
      setAmount(1);
    } else {
      setAmount((prev) => prev - 1);
    }
  };

  const handleIncreaseAmount = () => {
    if (amount === product?.stock) {
      setAmount(product.stock);
    } else {
      setAmount((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Cart id: " + id);
    if (product) {
      if (isLogged) {
        onAddItem({ product_id: product.id, amount, cart_id: id });
      } else {
        onAddMemoryItem({
          id: "",
          product_id: product.id,
          amount,
          description: product.description,
          image: product.images[0],
          name: product.name,
          price: product.price,
          total: parseFloat(product.price) * amount + "",
          stock: product.stock,
        });
      }
    }
  };

  if (!product)
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <Spinner label="Cargando..." size="lg" />
      </div>
    );

  return (
    <div className="w-full">
      <NavbarUI />
      <div className="w-[1000px] h-auto min-h-[300px] m-auto flex p-12">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full gap-4">
            <div className="p-6 flex gap-4 w-full border border-slate-400">
              <div className="flex flex-col gap-3">
                {product.images.map((i) => (
                  <Image
                    className={`rounded-none border cursor-pointer ${
                      i === imageSelected && "border-slate-600"
                    }`}
                    key={i}
                    src={i}
                    onClick={() => setImageSelected(i)}
                    alt={product.name}
                    width={100}
                    height={100}
                  />
                ))}
              </div>
              <Image
                src={imageSelected}
                alt={product.name}
                width={500}
                height={500}
              />
            </div>
            <div className="p-6 border border-slate-400">
              <p className="text-sm font-semibold">Descripcion:</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="p-6 border border-slate-400 flex flex-col gap-6 w-[80%]">
            <h1 className="text-2xl font-semibold">
              {product.name.toUpperCase()}{" "}
            </h1>
            <Divider />
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">Coleccion: </p>
              <p>
                {" "}
                {product.collection
                  ? product.collection?.name
                  : "No pertenece a ninguna coleccion"}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-sm font-semibold">Subcategoria: </p>
                <p> {product.subCategory.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-sm font-semibold">Existencias: </p>
                <h1 className="text-md"> {product.stock}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-sm font-semibold">Precio: </p>
                <h1 className="text-lg text-red-500 font-semibold">
                  {" "}
                  S/. {product.price}
                </h1>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-sm font-semibold">Cantidad: </p>
                <div className="flex items-center">
                  <Button
                    isDisabled={amount === 1}
                    onClick={handleDecreaseAmount}
                    variant="ghost"
                    color="secondary"
                    className="hover:text-white"
                    size="sm"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                  <span className="px-4">{amount}</span>
                  <Button
                    isDisabled={product.stock === amount}
                    onClick={handleIncreaseAmount}
                    variant="ghost"
                    color="primary"
                    className="hover:text-white"
                    size="sm"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              {product.stock === 0 ? (
                <Chip color="danger" size="lg" className="w-full" variant="flat">Agotado</Chip>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleAddToCart}
                  isLoading={isAddingItem}
                  variant="bordered"
                  color="primary"
                >
                  Agregar al Carrito
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
