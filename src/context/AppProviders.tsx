import React from "react";
import AuthProvider from "./auth/AuthProvider";
import CartProvider from "./cart/CartProvider";
import ShopProvider from "./shop/ShopProvider";
import AdminProviders from "./admin/AdminProvider";

export default function AppProviders({ children }: { children: React.ReactElement } ){
  return (
    <ShopProvider>
      <AuthProvider>
          <CartProvider>
            <AdminProviders>
              { children }
            </AdminProviders>
          </CartProvider>
      </AuthProvider>
    </ShopProvider>
  );
}