import Image from "next/image";

type Props = {
  className?: string;
  src?: string | null;
  alt?: string;
  rounded?: boolean;
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
}: Props) {
  const radius = rounded ? "rounded-2xl" : "";
  if (src) {
    return (
      <div className={`relative overflow-hidden ${radius} ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }
  return <div className={`image-placeholder ${radius} ${className}`} aria-hidden />;
}
