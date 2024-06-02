import { AdminMenu } from "@/components/AdminMenu";
import { AdminProvider } from "@/context/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin page",
  description: "Portal web de tienda de muebles",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <div className="flex overflow-hidden">
        <AdminMenu />
        { children }
      </div>
    </AdminProvider>
  );
}