import Image from "next/image";

interface StoreImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Responsive, lazy-loaded storefront image with rounded corners (Document 2 §7).
 * Uses next/image for optimization and correct sizing (Document 3 §8).
 */
export function StoreImage({ src, alt, priority = false }: StoreImageProps) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-border">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}
