import { productAPI, subcategoryAPI } from "@/api";
import {
  IProductTableCell,
  ISubCategory,
  NewProduct,
  UpdateProduct,
} from "@/declarations";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormik } from "formik";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { InputImage } from "./InputImage";
import { AdminContext } from "@/context/admin";

type Props = {
  handleOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
};

type ProductFormInputs = {
  name: string;
  description: string;
  subCategory: string;
  collection: string;
  price: string;
  stock: number;
  files: File[];
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  description: yup.string().required("Campo requerido"),
  subCategory: yup.string().required("Campo requerido"),
  price: yup.number().required("Campo requerido"),
  stock: yup.number().required("Campo requerido"),
  files: yup.mixed().required("Campo requerido"),
});

export function ProductModal({ handleOpenModal, isOpen }: Props) {
  const {
    subcategory: { subcategories },
    collection: { collections },
    product: { selected, loading },
    onCreateOrEditProduct,
    onSelectProduct,
  } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (!isOpen) {
      onSelectProduct(null);
    }
  }, [isOpen]);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isEditValid, setIsEditValid] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const {
    handleChange,
    handleBlur,
    touched,
    values,
    setFieldValue,
    isValid,
    resetForm,
    errors,
  } = useFormik<ProductFormInputs>({
    validateOnChange: true,
    isInitialValid: false,
    initialValues: {
      name: selected ? selected.name : "",
      description: selected ? selected.description : "",
      subCategory: selected ? selected.subCategory.id : "",
      collection: selected
        ? selected.collection
          ? selected.collection?.id
          : ""
        : "",
      price: selected ? selected.price : "",
      stock: selected ? selected.stock : 0,
      files: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: schema,
  });

  React.useEffect(() => {
    resetForm({
      values: {
        name: selected ? selected?.name : "",
        description: selected ? selected?.description : "",
        subCategory: selected ? selected.subCategory.id : "",
        collection: selected
          ? selected.collection
            ? selected.collection?.id
            : ""
          : "",
        price: selected ? selected?.price : "",
        stock: selected ? selected?.stock : 0,
        files: [],
      },
    });
  }, [selected]);

  React.useEffect(() => {
    setIsEditing(selected !== null ? true : false);
  }, [values]);

  const onSubmit = async () => {
    if (selected) {
      onCreateOrEditProduct(
        "Edit",
        {
          id: selected.id,
          newName: values.name,
          newSubCategoryId: values.subCategory,
          newCollectionId:
            values.collection.length === 0 ? null : values.collection,
          newDescription: values.description,
          newPrice: values.price,
          newStock: values.stock,
          files: values.files,
        } as UpdateProduct,
        () => {
          resetForm();
          handleOpenModal(false);
        }
      );
    } else {
      onCreateOrEditProduct(
        "Create",
        {
          name: values.name,
          subcategory_id: values.subCategory,
          collection:
            values.collection.length === 0 ? undefined : values.collection,
          description: values.description,
          price: values.price,
          stock: values.stock,
          files: values.files,
        } as NewProduct,
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
              Crear Productos
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                label="Nombre"
                isInvalid={!!errors.name && touched.name}
                errorMessage={touched.name && errors.name}
                variant="bordered"
              />
              <Textarea
                isRequired
                onChange={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                label="Descripcion"
                minRows={1}
                isMultiline
                placeholder="Describe el Producto..."
                isInvalid={!!errors.description && touched.description}
                errorMessage={touched.description && errors.description}
                variant="bordered"
              />
              <Select
                isRequired
                items={subcategories}
                label="Sub Categoria"
                variant="bordered"
                onChange={handleChange("subCategory")}
                onBlur={handleBlur("subCategory")}
                value={values.subCategory}
                isInvalid={!!errors.subCategory && touched.subCategory}
                errorMessage={touched.subCategory && errors.subCategory}
                defaultSelectedKeys={
                  selected && ([selected.subCategory.id] as any)
                }
              >
                {(subcategory) => (
                  <SelectItem value={subcategory.id} key={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                )}
              </Select>
              <Select
                items={collections}
                label="Colleccion"
                variant="bordered"
                onChange={handleChange("collection")}
                onBlur={handleBlur("collection")}
                value={values.collection}
                isInvalid={!!errors.collection && touched.collection}
                errorMessage={touched.collection && errors.collection}
                defaultSelectedKeys={
                  selected &&
                  ([
                    selected.collection ? selected.collection.id : undefined,
                  ] as any)
                }
              >
                {(collection) => (
                  <SelectItem value={collection.id} key={collection.id}>
                    {collection.name}
                  </SelectItem>
                )}
              </Select>
              <Input
                isRequired
                onChange={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                label="Precio"
                isInvalid={!!errors.price && touched.price}
                errorMessage={touched.price && errors.price}
                variant="bordered"
              />
              <Input
                isRequired
                onChange={handleChange("stock")}
                onBlur={handleBlur("stock")}
                type="number"
                value={values.stock === 0 ? undefined : values.stock + ""}
                label="Stock"
                isInvalid={!!errors.stock && touched.stock}
                errorMessage={touched.stock && errors.stock}
                variant="bordered"
              />
              <InputImage
                label="Imagenes"
                multiple={true}
                accept=".jpg,.png,.webp"
                onBlur={handleBlur("file")}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const fileList = event.currentTarget.files;
                  if (fileList) {
                    let filesToSave: File[] = [];
                    for (let i = 0; i < fileList.length; i++) {
                      filesToSave.push(fileList[i]);
                    }
                    setFieldValue("files", filesToSave);
                    setFiles(filesToSave);
                  }
                }}
                isInvalid={!!errors.files && touched.files}
                errorMessage={touched.files && errors.files + ""}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                className="text-white"
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
