"use client";
import { Button } from '@nextui-org/button';
import {Badge} from "@nextui-org/badge";
import { usePathname, useRouter } from 'next/navigation';
import { Listbox, ListboxSection, ListboxItem } from '@nextui-org/listbox';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Image, User } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/skeleton';
import NextLink from 'next/link';
import Link from 'next/link';
import { Suspense, use, useContext } from 'react';
import { AuthContext } from '@/context/auth';
import Loading from '@/app/admin/loading';

export const AdminMenu = () => {
  
  const router = useRouter();
  const { user, onLogout, isLoadingUserData } = useContext( AuthContext );
  
  const handleLogout = () => {
    onLogout();
    router.push("/auth/login")
  }

  return (
    <div className='h-[100vh] w-[280px] bg-white border p-4 flex flex-col gap-6 select-none'>
      <div className='flex justify-between items-center'>
        <Image src='/LOGO.jpeg' alt='Creaciones joaquin' width={140} height={140}/>
        <Button isIconOnly variant="light" radius="full">
          <Badge size="sm" content="5" color="danger" placement="top-right" isInvisible={ false }>
            <i className="fa-solid fa-bell text-[20px]"></i>
          </Badge>
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                /* isBordered: true, */
                name: user.firstName
                //src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description={ <p className='text-sm'>{ user.email }</p> }
              name={ user.firstName + " " + user.lastName }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="MiPerfil">
              Mi perfil
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div>
        <div className="w-full max-w-[260px] px-1 py-2 rounded-small">
        <Listbox variant="flat" aria-label="Listbox menu with sections">
          <ListboxSection title="Analiticas" showDivider>
            <ListboxItem
              key="Dashboard"
              startContent={<i className="fa-solid fa-chart-line"></i>}
            >
              <NextLink passHref legacyBehavior href={"/admin/dashboard"}>
                <Link href={"#"}>Dashboard</Link>
              </NextLink>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Mantenimiento" showDivider>
            <ListboxItem
              key="Categorias"
              startContent={<i className="fa-solid fa-layer-group"></i>}
            >
              <NextLink passHref legacyBehavior href={"/admin/category"}>
                <Link href={"#"}>
                  <p>Categorias</p>
                </Link>
              </NextLink>
            </ListboxItem>
            <ListboxItem
              key="SubCategorias"
              startContent={<i className="fa-solid fa-list"></i>}
            >
              <NextLink passHref legacyBehavior href={"/admin/sub-category"}>
                <Link href={"#"}>
                  <p>Sub Categorias</p>
                </Link>
              </NextLink>
            </ListboxItem>
            <ListboxItem
              key="Colecciones"
              startContent={<i className="fa-solid fa-object-group"></i>}
            >
              <NextLink passHref legacyBehavior href={"/admin/collection"}>
                <Link href={"#"}>
                  <p>Colecciones</p>
                </Link>
              </NextLink>
            </ListboxItem>
            <ListboxItem
              key="Productos"
              startContent={<i className="fa-solid fa-couch"></i>}
            >
              <NextLink passHref legacyBehavior href={"/admin/product"} >
                <Link href={""}>
                  <p>Productos</p>
                </Link>
              </NextLink>
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Ajustes">
            <ListboxItem
              key="CerrarSesion"
              color="danger"
              onClick={handleLogout}
              startContent={<i className="fa-solid fa-right-from-bracket"></i>}
            >
              Cerrar Sesion
            </ListboxItem>
          </ListboxSection>
        </Listbox>
        </div>
      </div>
    </div>
  )
}

