"use client";

import { Button } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Input} from "@nextui-org/react";
import NextLink from 'next/link';
import {Link} from "@nextui-org/link";
import React from 'react'
import * as yup from "yup";
import { useFormik } from "formik";
import { sendConfirmationEmail } from '@/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type ChangePasswordFormInputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido")
});

export default function ChangePasswordPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const { handleSubmit, values, handleChange, isValid, errors } =
    useFormik<ChangePasswordFormInputs>({
      initialValues: {
        email: ""
      },
      validateOnChange: true,
      isInitialValid: false,
      onSubmit: async ({ email }) => {
        setIsLoading(true);
        const response = await sendConfirmationEmail( email );
        if( response?.success ){
          router.push("/auth/login");
          toast.success( response.message );
        }else {
          toast.error( response?.message || "Ocurrio un error");
        }
        setIsLoading(false);
      },
      validationSchema: schema,
    });

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <Card className="p-6 w-[400px]" isBlurred>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <h1 className="font-bold text-[25px]">Cambiar mi contraseña</h1>
            <h3 className='text-sm text-center text-slate-500'>Se te enviara un correo de confirmacion para cambiar tu contraseña</h3>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4 mt-[10px]">
            <div className='flex flex-col gap-4'>
              <Input
                variant="bordered"
                type="email"
                label="Email"
                onChange={ handleChange("email")}
                value={ values.email }
                isInvalid={ !!errors.email }
                errorMessage={ errors.email }
              />
            </div>
            <Button type="submit" size="lg" color="primary" isDisabled={ !isValid } isLoading={ isLoading }>
              Confirmar
            </Button>
          </CardBody>
          <CardFooter>
            <p className='w-full text-sm text-center'>
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
  )
}
