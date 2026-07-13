import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrácia",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#f5f5f3] text-ink">{children}</div>;
}
