import Image from "next/image";
import Link from "next/link";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";

interface PromoImagePageProps {
  /** Cloudinary poster URL */
  src: string;
  alt: string;
  title: string;
  /** Intrinsic image dimensions (prevents layout shift, keeps aspect ratio) */
  width: number;
  height: number;
}

/**
 * Full-screen promotional poster view (used by /offers).
 *
 * Light theme: a pure-white background with dark text (matching the Schemes
 * page) so the poster reads on a bright page. Displays a single Cloudinary
 * image responsively on mobile and laptop (no cropping or distortion — the
 * intrinsic width/height keep the aspect ratio), plus the same floating
 * WhatsApp contact button used across the site.
 *
 * This is additive: it does not touch the home page layout or alignment.
 */
export function PromoImagePage({ src, alt, title, width, height }: PromoImagePageProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="container-lux flex min-h-screen flex-col items-center gap-8 py-24 md:py-28">
        <Link
          href="/"
          className="btn -ml-4 self-start border border-gold/70 text-black hover:border-gold hover:text-gold md:-ml-6 lg:-ml-8"
          aria-label="Back to home"
        >
          &larr; Back
        </Link>

        <h1 className="text-center font-display text-display-m text-black">{title}</h1>

        <div className="w-full max-w-2xl overflow-hidden rounded-card border border-gold bg-white shadow-xl">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 672px"
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
