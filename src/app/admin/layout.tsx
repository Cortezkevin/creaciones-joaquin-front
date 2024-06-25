import { AdminMenu } from "@/components/AdminMenu";
import AdminProviders from "@/context/AppProviders";
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
    <AdminProviders>
      <div className="flex bg-slate-200 h-[100vh]">
        <AdminMenu />
        <div className="w-[calc(100vw-280px)] animate__animated animate__fadeIn animate__slower overflow-auto">
          { children }
        </div>
      </div>
    </AdminProviders>
  );
}