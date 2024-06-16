"use client";

import { NavbarUI } from "@/components/NavbarUI";
import { AuthContext } from "@/context/auth";
import { Image } from "@nextui-org/image";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

type InformationFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "El nombre debe tener 2 caracteres como minimo")
    .required("Campo requerido"),
  lastName: yup
    .string()
    .min(8, "El apellido debe tener 8 caracteres como minimo")
    .required("Campo requerido"),
  phone: yup
    .string()
    .matches(/^9\d{8}$/, "Ingrese un numero valido")
    .required("Ingrese un numero de telefono"),
});

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    user: { firstName, lastName, profile, id }, onUpdateProfile
  } = React.useContext(AuthContext);

  const handleEditInformation = async () => {
    if (isEditing) {
      setIsLoading(true);
      const result = await onUpdateProfile({ firstName: values.firstName, lastName: values.lastName, phone: values.phone, userId: id, birthdate: "" });
      setIsLoading(false);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    isValid,
    errors,
    resetForm,
  } = useFormik<InformationFormInputs>({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    validateOnChange: true,
    isInitialValid: true,
    onSubmit: async ({ firstName, lastName, phone }) => {
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    resetForm({
      values:{
        firstName: firstName,
        lastName: lastName,
        phone: profile.phone
      }
    });
  }, [ firstName ]);

  return (
    <div className="w-full pb-[100px]">
      <NavbarUI />
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="w-[350px]">
          <Image
            className="rounded-full shadow-lg border border-slate-300"
            src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            width={300}
            height={300}
            alt="Usuario"
          />
        </div>
        <div className="w-[500px] flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Informacion Personal</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              isReadOnly={!isEditing}
              isRequired
              label="Nombre"
              value={values.firstName}
              onChange={ handleChange("firstName")}
              onBlur={ handleBlur("firstName")}
              isInvalid={ !!errors.firstName && touched.firstName }
              errorMessage={ touched.firstName && errors.firstName }
            />
            <Input
              isReadOnly={!isEditing}
              isRequired
              label="Apellidos"
              value={values.lastName}
              onChange={ handleChange("lastName")}
              onBlur={ handleBlur("lastName")}
              isInvalid={ !!errors.lastName && touched.lastName }
              errorMessage={ touched.lastName && errors.lastName }
            />
            <Input
              isReadOnly={!isEditing}
              isRequired
              type="text"
              maxLength={9}
              label="Numero de Telefono"
              value={values.phone}
              onChange={ handleChange("phone")}
              onBlur={ handleBlur("phone")}
              isInvalid={ !!errors.phone && touched.phone }
              errorMessage={ touched.phone && errors.phone }
            />
            <Button
              className="text-white"
              color={isEditing ? "success" : "primary"}
              isDisabled={ !isValid || ( isEditing && values.phone === "" ) }
              onClick={handleEditInformation}
            >
              {isEditing ? "Guardar Cambios" : "Editar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
