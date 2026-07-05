import Link from "next/link";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/discounts", label: "Discounts" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/admin" className="text-sm font-bold tracking-widest uppercase">
            AH Admin
          </Link>
          <Link href="/" className="text-xs text-neutral-500 hover:text-black">
            View Store →
          </Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
        <nav className="hidden w-48 shrink-0 md:block">
          <ul className="space-y-1">
            {adminNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
