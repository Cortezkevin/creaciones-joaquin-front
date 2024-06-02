import React from "react";
import AuthProvider from "./auth/AuthProvider";
import CartProvider from "./cart/CartProvider";

export default function AppProviders({ children }: { children: React.ReactElement } ){
  return (
    <AuthProvider>
      <CartProvider>
        { children }
      </CartProvider>
    </AuthProvider>
  );
}