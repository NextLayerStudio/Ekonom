import Image from "next/image";

type Props = {
  className?: string;
  src?: string | null;
  alt?: string;
  rounded?: boolean;
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
};

/**
 * Grey box used everywhere a real photo will later be dropped in.
 * If `src` is provided it renders the actual image instead.
 */
export function ImagePlaceholder({
  className = "",
  src,
  alt = "",
  rounded = false,
  priority = false,
  objectPosition = "center",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const radius = rounded ? "rounded-2xl" : "";
  if (src) {
    return (
      <div className={`relative overflow-hidden ${radius} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }
  return <div className={`image-placeholder ${radius} ${className}`} aria-hidden />;
}
