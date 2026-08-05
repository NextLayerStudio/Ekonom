import Link from "next/link";
import { site } from "@/lib/site";

type LogoProps = {
  href?: string | false;
  showTagline?: boolean;
  showMark?: boolean;
  tagline?: string;
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
};

export function Logo({
  href = "/",
  showTagline = true,
  showMark = true,
  tagline = site.role,
  size = "md",
  onClick,
  className = "",
}: LogoProps) {
  const markSize = size === "sm" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm md:h-11 md:w-11";
  const nameSize =
    size === "sm" ? "text-base" : "text-[1.15rem] md:text-[1.35rem]";

  const content = (
    <span
      className={`group inline-flex items-center gap-2.5 md:gap-3 ${className}`}
    >
      {showMark && (
        <span
          className={`relative flex shrink-0 items-center justify-center rounded-xl bg-brand font-bold tracking-tight text-ink shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)] transition-transform duration-200 group-hover:scale-[1.03] ${markSize}`}
          aria-hidden
        >
          HG
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-ink/5" />
        </span>
      )}

      <span className="flex min-w-0 flex-col leading-none">
        <span className={`${nameSize} tracking-tight`}>
          <span className="font-normal text-ink">Happy</span>{" "}
          <span className="relative inline-block font-bold text-ink">
            Gold
            <span
              className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand"
              aria-hidden
            />
          </span>
        </span>

        {showTagline && tagline && (
          <span className="mt-1.5 truncate text-[10px] uppercase tracking-[0.22em] text-muted md:text-[11px]">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );

  if (href !== false) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
