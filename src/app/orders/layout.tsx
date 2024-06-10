import { NavbarUI } from "@/components/NavbarUI";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main >
      <NavbarUI />
      <div className="p-6 bg-slate-100">
        { children }
      </div>
    </main>
  );
}
