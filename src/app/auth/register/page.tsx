"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import React from "react";
import * as yup from "yup";
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import { IAddress, ICart } from "@/declarations";
import { assert } from "console";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Campo requerido"),
  lastName: yup
    .string()
    .required("Campo requerido"),
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required("Campo requerido"),
});

export default function RegisterPage() {
  
  const router = useRouter();
  const { onRegister } = React.useContext( AuthContext );
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isValid, errors, touched } =
    useFormik<RegisterFormInputs>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ firstName, lastName, email, password }) => {
        const cart = JSON.parse(Cookies.get("cart") || 'null') as ICart;
        const address = JSON.parse(Cookies.get("address") || "null") as IAddress;
        setIsLoading(true);
        const result = await onRegister({
          email,
          password,
          firstName,
          lastName,
          isAdmin: false,
          memoryCart: cart ? {
            itemList: cart.cartItems.map(i => {
              return {
                amount: i.amount,
                productId: i.product_id
              }
            })
          } : undefined,
          memoryAddress: address ? {
            ...address
          } : undefined
        });
        if( result ){
          router.push('/');
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-6 bg-slate-100">
      <div className="flex flex-col items-center gap-2">
        <Image src="/LOGO.jpeg" alt="LOGO" width={170} height={170} />
        <p className="text-sm">"Tu destino para muebles de calidad."</p>
      </div>
      <form onSubmit={ handleSubmit }>
        <Card className="p-6 w-[400px]" isBlurred>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h1 className="font-bold text-[25px]">Crear una cuenta</h1>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4 mt-[10px]">
            <div className="flex flex-col gap-4">
              <Input
                isRequired
                variant="bordered"
                type="text"
                label={
                  <>
                    <i className="fa-solid fa-file-lines text-slate-600 mr-2"></i>
                    Nombre
                  </>
                }
                onChange={ handleChange("firstName")}
                onBlur={ handleBlur("firstName")}
                value={ values.firstName }
                isInvalid={ !!errors.firstName && touched.firstName }
                errorMessage={ touched.firstName && errors.firstName }
              />
              <Input
                isRequired
                variant="bordered"
                type="text"
                label={
                  <>
                    <i className="fa-solid fa-file-lines text-slate-600 mr-2"></i>
                    Apellidos
                  </>
                }
                onChange={ handleChange("lastName")}
                onBlur={ handleBlur("lastName")}
                value={ values.lastName }
                isInvalid={ !!errors.lastName && touched.lastName }
                errorMessage={ touched.lastName && errors.lastName }
              />
              <Input
                isRequired
                variant="bordered"
                type="email"
                label={
                  <>
                    <i className="fa-solid fa-envelope text-slate-600 mr-2"></i>
                    Email
                  </>
                }
                onChange={ handleChange("email")}
                onBlur={ handleBlur("email")}
                value={ values.email }
                isInvalid={ !!errors.email && touched.email }
                errorMessage={ touched.email && errors.email }
              />
              <Input
                isRequired
                variant="bordered"
                type="password"
                label={
                  <>
                    <i className="fa-solid fa-lock text-slate-600 mr-2"></i>
                    Password
                  </>
                }
                onChange={ handleChange("password")}
                onBlur={ handleBlur("password")}
                value={ values.password }
                isInvalid={ !!errors.password && touched.password }
                errorMessage={ touched.password && errors.password }
              />
              <Input
                isRequired
                variant="bordered"
                type="password"
                label={
                  <>
                    <i className="fa-solid fa-lock text-slate-600 mr-2"></i>
                    Confirm Password
                  </>
                }
                onChange={ handleChange("confirmPassword")}
                onBlur={ handleBlur("confirmPassword")}
                value={ values.confirmPassword }
                isInvalid={ !!errors.confirmPassword && touched.confirmPassword }
                errorMessage={ touched.confirmPassword && errors.confirmPassword }
              />
            </div>
            <Button type="submit" size="lg" color="primary" className="text-white" isDisabled={ !isValid } isLoading={isLoading}>
              Confirmar
            </Button>
          </CardBody>
          <CardFooter>
            <p className="w-full text-sm text-center">
              Ya tienes una cuenta?
              <NextLink passHref href={"/auth/login"} legacyBehavior>
                <Button as={Link} color="primary" href="" variant="light" >
                  Iniciar Sesion
                </Button>
              </NextLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
