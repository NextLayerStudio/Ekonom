"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LayoutDashboard, LogOut, Plus, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "/admin", label: "Prehľad", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts/new", label: "Nový článok", icon: Plus },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white px-5 py-8 md:flex">
        <div className="px-2">
          <p className="text-lg font-bold">{site.name}</p>
          <p className="text-xs text-muted">Administrácia</p>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map((l) => {
            const active = l.exact
              ? pathname === l.href
              : pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-brand text-ink" : "text-muted hover:bg-ink/5"
                }`}
              >
                <Icon size={18} />
                {l.label}
              </Link>
            );
          })}

          <Link
            href="/blog"
            target="_blank"
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-ink/5"
          >
            <ExternalLink size={18} />
            Zobraziť web
          </Link>
        </nav>

        <div className="border-t border-line pt-4">
          <p className="truncate px-3 text-xs text-muted">{email}</p>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-ink/5"
          >
            <LogOut size={18} />
            Odhlásiť sa
          </button>
        </div>
      </aside>

      <div className="flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4 md:hidden">
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <span className="font-semibold">Administrácia</span>
          </div>
          <button onClick={logout} className="text-sm text-muted">
            Odhlásiť
          </button>
        </div>

        <div className="px-5 py-8 md:px-10">{children}</div>
      </div>
    </div>
  );
}
