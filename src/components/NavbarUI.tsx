"use client";
import { AuthContext } from "@/context/auth";
import { CartContext } from "@/context/cart";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { User } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const NavbarUI = () => {
  const { isAdmin, isLogged, onLogout, user } = useContext(AuthContext);
  const { loadingItems, count, onClear } = useContext(CartContext);
  const router = useRouter();

  const handleLoginAccount = () => {
    router.push("/auth/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  }

  const handleAdminAccount = () => {
    if( isAdmin ){
      router.push("/admin/category");
    }else{
      router.push("/admin/orders");
    }
  };

  const handleCart = () => {
    router.push("/cart");
  };

  const handleOrdersHistory = () => {
    router.push("/orders");
  };

  const handleLogout = () => {
    onLogout();
    onClear();
  };

  return (
    <Navbar className="p-2 w-full" isBordered>
      <NavbarBrand>
        <Image
          onClick={() => router.push("/")}
          className="cursor-pointer"
          src="/LOGO.jpeg"
          alt="Creaciones joaquin"
          width={140}
          height={140}
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6 w-[400px]" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
       {/*  <NavbarItem>
          <Link href="#" aria-current="page">
            Sobre Nosotros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contactanos
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent className="flex items-center justify-center ml-[50px]">
        <NavbarItem>
          <Badge
            size="lg"
            content={count}
            color="danger"
            placement="top-right"
            isInvisible={count > 0 ? false : true}
          >
            <Button
              className="hover:text-white"
              size="sm"
              onClick={handleCart}
              color="primary"
              variant="ghost"
              startContent={<i className="fa-solid fa-cart-shopping"></i>}
              isLoading={loadingItems}
            >
              <p className="hidden lg:flex">Carrito</p>
            </Button>
          </Badge>
        </NavbarItem>
        {(isAdmin || user.roles.includes("ROLE_WAREHOUSE") || user.roles.includes("ROLE_TRANSPORT")) && (
          <Button
            onClick={handleAdminAccount}
            color="primary"
            variant="flat"
            startContent={<i className="fa-solid fa-user"></i>}
          >
            Admin Panel
          </Button>
        )}
        <NavbarItem>
          {isLogged ? (
            <Dropdown size="sm" placement="bottom-end">
              <DropdownTrigger className="flex">
                <User
                  as="button"
                  avatarProps={{
                    name: user.firstName,
                    //src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  name={undefined}
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem isReadOnly key="detail" className="h-14 gap-2">
                  <User
                    avatarProps={{
                      name: user.firstName,
                      //src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    name={user.firstName + " " + user.lastName}
                    description={user.email}
                    className="transition-transform"
                  />
                </DropdownItem>
                <DropdownItem key="MiPerfil" onClick={handleProfile}>Mi perfil</DropdownItem>
                <DropdownItem key="MisPedidos" onClick={handleOrdersHistory}>
                  Mis pedidos
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Cerrar Sesion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              size="sm"
              onClick={handleLoginAccount}
              color="primary"
              variant="flat"
              startContent={<i className="fa-solid fa-user"></i>}
            >
              <p className="hidden lg:flex">Cuenta</p>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
