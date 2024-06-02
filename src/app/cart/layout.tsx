import { NavbarUI } from "@/components/NavbarUI";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main >
     <NavbarUI />
      { children }
    </main>
  );
}
