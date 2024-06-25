import {
  NewCollection,
  UpdateCollection,
} from "@/declarations";
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
import { Select, SelectItem } from "@nextui-org/select";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { InputImage } from "./InputImage";
import { StoreContext } from "@/context";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type CollectionFormInputs = {
  name: string;
  category: string;
  file: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  category: yup.string().required("Campo requerido"),
  file: yup.mixed().required("Campo requerido"),
});

export function CollectionModal({ handleOpenModal, isOpen }: Props) {
  const {
    category: { categories },
    collection: { selected, loading },
    onCreateOrEditCollection,
    onSelectCollection
  } = React.useContext(StoreContext);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(!isOpen){
      onSelectCollection( null );
    }
  }, [isOpen]);

  const { handleChange, handleBlur, touched, values, setFieldValue, isValid, resetForm, errors } =
    useFormik<CollectionFormInputs>({
      validateOnChange: true,
      isInitialValid: false,
      initialValues: {
        name: selected ? selected.name : "",
        category: selected ? selected.category.id : "",
        file: selected ? "null" : null,
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: schema,
    });

  React.useEffect(() => {
    resetForm({
      values: {
        name: selected ? selected.name : "",
        category: selected ? selected.category.id : "",
        file: selected ? "null" : null,
      },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if (selected) {
      onCreateOrEditCollection(
        "Edit",
        {
          id: selected.id,
          newName: values.name,
          newCategoryId: values.category,
          file: values.file,
        } as UpdateCollection,
        () => {
          resetForm();
          handleOpenModal(false);
        }
      );
    } else {
      onCreateOrEditCollection(
        "Create",
        {
          name: values.name,
          category_id: values.category,
          file: values.file,
        } as NewCollection,
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
              { isEditing ? "Editar Coleccion" : "Crear nueva Coleccion" }
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Nombre"
                isInvalid={!!errors.name && touched.name }
                errorMessage={ touched.name && errors.name}
                variant="bordered"
              />
              <Select
                isRequired
                items={categories}
                label="Categoria"
                variant="bordered"
                onChange={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
                isInvalid={!!errors.category && touched.category}
                errorMessage={touched.category && errors.category}
                defaultSelectedKeys={
                  selected && ([selected.category.id] as any)
                }
              >
                {(category) => (
                  <SelectItem value={category.id} key={category.id}>
                    {category.name}
                  </SelectItem>
                )}
              </Select>
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
              {selected && (
                <Image
                  alt="asd"
                  src={selected.url_image}
                  width={100}
                  height={100}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => {
                resetForm();
                onClose();
              }}>
                Cerrar
              </Button>
              <Button
                color="primary" className="text-white"
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
