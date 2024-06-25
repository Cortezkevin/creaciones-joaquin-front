"use client";
import { DataTable, DataTableModalProps } from "@/components/DataTable";
import { UserModal } from "@/components/UserModal";
import { StoreContext } from "@/context";
import { Status } from "@/declarations";
import { IUsersTableCell, IUsersTableColumn } from "@/declarations/table/users";
import { Chip, Tooltip } from "@nextui-org/react";
import React from "react";

const columns: IUsersTableColumn[] = [
  {
    key: "firstName",
    title: "Nombre",
  },
  {
    key: "lastName",
    title: "Apellidos",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "roles",
    title: "Roles",
  },
  {
    key: "status",
    title: "Estado"
  },
  {
    key: "actions",
    title: "Acciones",
  },
];

export default function UsersPage() {
  const {
    user: { users },
    loadingData,
    loadUsers,
    onSelectUser,
  } = React.useContext(StoreContext);

  const renderCell = React.useCallback(
    (
      item: IUsersTableCell,
      columnKey: keyof IUsersTableCell | "actions",
      modalProps: DataTableModalProps<IUsersTableCell>
    ) => {
      let cellValue = "";
      let roles: string[] = [];
      if (columnKey === "roles") {
        roles = item[columnKey];
      }
      if (columnKey != "actions" && columnKey != "roles") {
        cellValue = item[columnKey];
      }

      switch (columnKey) {
        case "firstName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "lastName":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "roles":
          return (
            <div className="flex gap-2 flex-wrap">
              {roles.map((r) => (
                <Chip
                  key={ r }
                  variant="flat"
                  color={
                    r === "ROLE_USER"
                      ? "warning"
                      : r === "ROLE_ADMIN"
                      ? "danger"
                      : "secondary"
                  }
                >
                  {r}
                </Chip>
              ))}
            </div>
          );
        case "status":
          return (
            <Chip variant="flat" color={ cellValue as Status === "ACTIVO" ? "success" : "danger" } >{ cellValue }</Chip>
          )
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Tooltip color="warning" content="Edit">
                <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      onSelectUser(item);
                      modalProps.openModal(true);
                    }}
                  ></i>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    []
  );

  React.useEffect(() => {
    loadUsers();
  }, [])

  return (
    <div className="w-full h-[100vh] p-8 bg-slate-200 flex flex-col gap-6 overflow-auto animate__animated animate__fadeIn animate__fast">
      <h1 className="text-large font-semibold">Usuarios</h1>
      <DataTable
        columns={columns}
        data={users}
        filterBy="firstName"
        isLoading={loadingData}
        typeName={"Usuario"}
        modal={UserModal}
        renderCell={renderCell}
        showCreateButton={ false }
      />
    </div>
  );
}
