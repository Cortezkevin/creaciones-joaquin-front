import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/ui/fonts";
import Script from "next/script";
import { NextUIProvider } from "@nextui-org/system";
import AppProviders from "@/context/AppProviders";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Creaciones Joaquin",
  description: "Portal web de tienda de muebles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className={poppins.className}>
        <div className="w-full h-full bg-slate-100">
          <AppProviders>
            <NextUIProvider>
              {children}
              <Toaster />
            </NextUIProvider>
          </AppProviders>
        </div>
        <Script
          src="https://kit.fontawesome.com/40a42e87f5.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
