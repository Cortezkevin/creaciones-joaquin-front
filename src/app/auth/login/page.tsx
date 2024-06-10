"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { divider, Image, Input } from "@nextui-org/react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContext } from "@/context/auth";
import { useRouter, useSearchParams } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup
  .object().shape({
    email: yup.string().email("Ingrese un email valido").required("Campo requerido"),
    password: yup.string().min(8, "La contraseña debe tener 8 caracteres como minimo").required("Campo requerido")
});

export default function LoginPage() {

  const { onLogin } = useContext( AuthContext );
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, values, handleChange, handleBlur, touched, isValid, errors } = useFormik<LoginFormInputs>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    isInitialValid: false,
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      const result = await onLogin( email, password);
      if( result ){
        push(searchParams.get("prevPage") || '/');
      }
      setIsLoading(false);
    },
    validationSchema: schema
  });

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-6 bg-slate-100">
      <div className="flex flex-col items-center gap-2">
        <Image src="/LOGO.jpeg" alt="LOGO" width={170} height={170} />
        <p className="text-sm">"Tu destino para muebles de calidad."</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="p-6 w-[400px]" isBlurred>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h1 className="font-bold text-[25px]">Iniciar Sesion</h1>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4 mt-[10px]">
            <div className="flex flex-col gap-4">
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
            </div>
            <div className="flex justify-end">
              <NextLink passHref href={"/auth/change-password"} legacyBehavior>
                <Button as={Link} color="primary" href="#" variant="light">
                  Olvide mi contraseña
                </Button>
              </NextLink>
            </div>
            <Button type="submit" size="lg" className="text-white" color="primary" isDisabled={ !isValid } isLoading={ isLoading }>
              Confirmar
            </Button>
          </CardBody>
          <CardFooter>
            <p className="w-full text-sm text-center ">
              No tienes una cuenta?
              <NextLink passHref href={"/auth/register"} legacyBehavior>
                <Button as={Link} href="#" variant="light" color="primary">
                  Registrate
                </Button>
              </NextLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
