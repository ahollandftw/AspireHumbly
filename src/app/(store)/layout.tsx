import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { EmailPopup } from "@/components/layout/email-popup";
import { Analytics } from "@/components/analytics";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </main>
      <Footer />
      <CartDrawer />
      <EmailPopup />
      <Analytics />
    </>
  );
}
