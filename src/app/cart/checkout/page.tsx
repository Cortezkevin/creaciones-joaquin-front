import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function Checkout() {
  return (
    <div className="flex flex-col w-full p-6">
      <h1 className="text-2xl font-semibold">Detalles del pedido</h1>
      <div className="flex flex-col gap-4 items-center">
        <form className="w-[400px] flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-center">Direccion de Entrega</h2>
          <div className="flex flex-col gap-2">
            <Input label="Direccion" value={"Av. San Marcos 123"} isDisabled={ true } />
            <Button color="primary" className="text-white">Cambiar direccion</Button>
          </div>
        </form>
        <div>
          <div className="flex gap-2">
            <p>Precio de Envio:</p>
            <p className="font-semibold">S/. 50.00</p>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}