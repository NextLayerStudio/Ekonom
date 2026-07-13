import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-ink/5",
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  ...props
}: { href: string; variant?: Variant } & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: Variant } & ComponentProps<"button">) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
