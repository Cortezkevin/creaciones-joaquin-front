import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/ui/fonts";
import Script from "next/script";
import { NextUIProvider } from "@nextui-org/system";
import AppProviders from "@/context/AppProviders";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";

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
      <body className={poppins.className}>
        <div className="w-full h-[100vh] flex flex-col justify-between">
          <div>
            <AppProviders>
              <NextUIProvider>
                {children}
                <Toaster />
              </NextUIProvider>
            </AppProviders>
          </div>
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/40a42e87f5.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
