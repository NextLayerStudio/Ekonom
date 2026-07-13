import { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}
      {...props}
    />
  );
}
