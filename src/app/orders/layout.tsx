import { Footer } from "@/components/Footer";
import { NavbarUI } from "@/components/NavbarUI";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main >
      <NavbarUI />
      <div className="p-6 ">
        { children }
      </div>
      <Footer />
    </main>
  );
}
