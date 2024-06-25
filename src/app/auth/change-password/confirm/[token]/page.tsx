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
import { ICart } from "@/declarations";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";


type ChangePasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, "La contraseña debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required("Campo requerido"),
});

export default function ConfirmChangePasswordPage({
  params,
}: {
  params: { token: string };
}) {

  const router = useRouter();
  const { onChangePassword } = React.useContext( AuthContext );
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isValid, errors, touched } =
    useFormik<ChangePasswordFormInputs>({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ password, confirmPassword }) => {
        setIsLoading(true);
        const result = await onChangePassword(password, confirmPassword, params.token);
        if( result ){
          router.push('/auth/login');
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-6 bg-slate-100 animate__animated animate__fadeIn">
      <div className="flex flex-col items-center gap-2">
        <Image src="/LOGO.jpeg" alt="LOGO" width={170} height={170} />
        <p className="text-sm">"Tu destino para muebles de calidad."</p>
      </div>
      <form onSubmit={ handleSubmit }>
        <Card className="p-6 w-[400px]" isBlurred>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h1 className="font-bold text-[25px]">Cambiar Contraseña</h1>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4 mt-[10px]">
            <div className="flex flex-col gap-4">
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
              Recordaste tu contraseña?
              <NextLink passHref href={"/auth/login"} legacyBehavior>
                <Button as={Link} color="primary" href="" variant="light">
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
