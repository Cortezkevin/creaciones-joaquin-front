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
import React, { useEffect } from "react";
import * as yup from "yup";
import { InputImage } from "./InputImage";
import { AdminContext } from "@/context/admin";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean
};

type CategoryFormInputs = {
  name: string;
  file: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  file: yup.mixed().required("Campo requerido"),
});

export function CategoryModal({ handleOpenModal, isOpen }: Props) {

  const { category: { selected, loading }, onCreateOrEditCategory, onSelectCategory } =  React.useContext( AdminContext );

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  useEffect(() => {
    if(!isOpen){
      onSelectCategory( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, values, setFieldValue, isValid, resetForm, errors, touched } =
    useFormik<CategoryFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        name: selected ? selected.name : "",
        file: selected ? "null" : null,
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
      values: { name: selected ? selected?.name : "", file: selected ? "null" : null },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== undefined ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if( selected ){
      onCreateOrEditCategory("Edit", selected.id, values, () => {
        resetForm();
        handleOpenModal(false);
      });
    }else {
      onCreateOrEditCategory("Create", null, values, () => {
        resetForm();
        handleOpenModal(false);
      });
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
              { isEditing ? "Editar Categoria" : "Crear nueva Categoria" }
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Nombre"
                placeholder="Ingresa el nombre de la categoria"
                isInvalid={!!errors.name && touched.name }
                errorMessage={ touched.name && errors.name}
                variant="bordered"
              />
              {selected && (
                <div>
                  <span>Imagen</span>
                  <Image
                    alt="asd"
                    src={selected.url_image}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <InputImage
                accept=".jpg,.png,.webp"
                label="Imagen"
                multiple={false}
                onBlur={ handleBlur("file") }
                onChange={(event: any) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                isInvalid={!!errors.file && touched.file}
                errorMessage={ touched.file && errors.file + ""}
              />
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
