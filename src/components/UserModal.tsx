import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Select, SelectItem } from "@nextui-org/select";
import { userAPI } from "@/api";
import { IRole } from "@/declarations";
import { AdminContext } from "@/context/admin";
import { Chip } from "@nextui-org/react";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type UserFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

const schema = yup.object().shape({
  firstName: yup.string().required("Campo requerido"),
  lastName: yup.string().required("Campo requerido"),
  email: yup
    .string()
    .email("Ingrese un email valido")
    .required("Campo requerido"),
  roles: yup
    .array()
    .of(yup.string())
    .min(1, "Seleccione al menos un rol")
    .required("Campo requerido"),
});

export function UserModal({ handleOpenModal, isOpen }: Props) {
  const {
    user: { selected, loading },
    onSelectUser,
    onEditUser,
  } = React.useContext(AdminContext);
  const [roles, setRoles] = React.useState<IRole[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await userAPI.getRoles();
      if (response && response.success) {
        setRoles(response.content);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectUser(null);
    }
  }, [isOpen]);

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    isValid,
    resetForm,
    errors,
    touched,
  } = useFormik<UserFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roles: [""],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    resetForm({
      values: {
        firstName: selected ? selected?.firstName : "",
        lastName: selected ? selected?.lastName : "",
        roles: selected ? selected.roles : [],
        email: selected ? selected.email : "",
      },
    });
  }, [selected]);

  const onSubmit = async () => {
    if (selected) {
      onEditUser(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roles: values.roles,
          userId: selected.id,
        },
        () => {
          resetForm();
          handleOpenModal(false);
        }
      );
    }
  };

  const handleClose = () => {
    resetForm();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenModal} placement="center" onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                label="Nombre"
                isInvalid={!!errors.firstName && touched.firstName}
                errorMessage={touched.firstName && errors.firstName}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                label="Apellidos"
                isInvalid={!!errors.lastName && touched.lastName}
                errorMessage={touched.lastName && errors.lastName}
                variant="bordered"
              />
              <Input
                isRequired
                type="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                label="Email"
                isInvalid={!!errors.email && touched.email}
                errorMessage={touched.email && errors.email}
                variant="bordered"
              />
              <Select
                label="Roles"
                selectionMode="multiple"
                placeholder="Selecciona los roles"
                selectedKeys={values.roles}
                onBlur={handleBlur("roles")}
                value={values.roles}
                isInvalid={!!errors.roles && touched.roles}
                errorMessage={touched.roles && errors.roles}
                variant="bordered"
                onSelectionChange={(e: any) => {
                  setFieldValue("roles", [...e]);
                }}
              >
                {roles.map((role) => (
                  <SelectItem key={role.key} textValue={role.value}>
                    <Chip
                      variant="flat"
                      color={
                        role.key === "ROLE_USER"
                          ? "warning"
                          : role.key === "ROLE_ADMIN"
                          ? "danger"
                          : "secondary"
                      }
                    >
                      {role.value}
                    </Chip>
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => {
                resetForm();
                onClose();
              }}>
                Cerrar
              </Button>
              <Button
                color="primary"
                className=" text-white"
                onPress={onSubmit}
                isDisabled={!isValid}
                isLoading={loading}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
