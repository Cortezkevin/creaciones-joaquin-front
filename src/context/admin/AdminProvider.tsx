import React from "react";
import { EmployeeProvider, OrderProvider, StoreProvider } from "./";
import { PurchaseProvider } from "./purchase";
import { WarehouseProvider } from "./warehouse";
export default function AdminProviders({ children }: { children: React.ReactElement } ){
  return (
    <StoreProvider>
      <EmployeeProvider>
        <WarehouseProvider>
          <PurchaseProvider>
            <OrderProvider>
              { children }
            </OrderProvider>
          </PurchaseProvider>
        </WarehouseProvider>
      </EmployeeProvider>
    </StoreProvider>
  );
}