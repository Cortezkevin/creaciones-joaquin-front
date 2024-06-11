import React from "react";
import AuthProvider from "./auth/AuthProvider";
import CartProvider from "./cart/CartProvider";
import ShopProvider from "./shop/ShopProvider";

export default function AppProviders({ children }: { children: React.ReactElement } ){
  return (
    <ShopProvider>
      <AuthProvider>
        <CartProvider>
          { children }
        </CartProvider>
      </AuthProvider>
    </ShopProvider>
  );
}