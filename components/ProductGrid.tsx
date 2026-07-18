"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { whatsappHref } from "@/lib/format";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import type { CollectionProduct } from "@/types/brand";

/**
 * Product grid with per-item WhatsApp enquiry + a near-fullscreen lightbox.
 *
 * Every card is uniform regardless of the source crop: a fixed elongated
 * portrait frame (aspect-[3/4], object-contain over a blurred fill of the same
 * photo so the whole piece is always shown and never cropped) with a caption
 * band that flexes to fill, so all cards in a row match height even when a name
 * wraps. Each card has a small WhatsApp button tucked into the top-right corner
 * (enquiry pre-filled with the product name); clicking the image opens it almost
 * full screen (dark backdrop; click outside, the close button, or Escape
 * dismisses it; body scroll locked). Tighter gutters on every breakpoint so the
 * tiles read as a close-packed product grid, including two-up on phones.
 * Client-side so the detail page can remain a server component.
 */

/** Soft edge feather (two crossed linear-gradient masks, intersected) so the
 *  sharp photo melts into the blurred fill behind it instead of ending in a
 *  hard rectangular line. This removes the "white border" seam and makes each
 *  piece fade into the card. Prefixed + standard props for Safari/Chrome. */
const FEATHER_MASK: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%), linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%), linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

export function ProductGrid({ products }: { products: CollectionProduct[] }) {
  const [active, setActive] = useState<CollectionProduct | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.image}
            className="group relative flex h-full flex-col overflow-hidden rounded-card border border-black/10 bg-white shadow-md transition-transform duration-300 ease-lux hover:-translate-y-1 hover:shadow-xl"
          >
            <button
              type="button"
              onClick={() => setActive(product)}
              aria-label={`View ${product.name}`}
              className="block w-full"
            >
              {/* Fixed portrait frame. Behind the product sits a blurred,
                  cover-scaled copy of the SAME photo, so the fill is always the
                  exact tone of that image's own background. The sharp foreground
                  shows the whole piece (object-contain, never cropped) and its
                  edges are feathered (FEATHER_MASK) so the photo fades into that
                  backdrop — no hard rectangular "white border" seam. Adapts to
                  any source ratio and any future collection add automatically. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 18vw"
                  className="scale-125 object-cover blur-2xl"
                />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 18vw"
                  style={FEATHER_MASK}
                  className="object-contain"
                />
              </div>
            </button>

            {/* Small per-item WhatsApp enquiry, tucked inside the card. */}
            <a
              href={whatsappHref(
                BRAND.whatsapp,
                `Hello ${BRAND.businessName}, I'm interested in the ${product.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-background shadow-md transition-transform duration-300 ease-lux hover:scale-110"
            >
              <WhatsAppGlyph size={14} />
            </a>

            {/* Caption band — aligned to the image width, faded golden-grey.
                flex-1 so every card's band fills to the same height. */}
            <span className="flex w-full flex-1 items-center justify-center bg-gold-muted px-2 py-3 text-center font-display text-base font-semibold leading-snug tracking-wide text-background sm:text-lg">
              {product.name}
            </span>
          </div>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-pill border border-white/30 text-2xl leading-none text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6 sm:top-6"
          >
            &times;
          </button>

          {/* Stop propagation so clicking the image itself doesn't close it. */}
          <div
            className="flex flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={active.name}
              width={active.width}
              height={active.height}
              sizes="92vw"
              className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-card object-contain shadow-2xl"
              priority
            />
            <p className="font-display text-xl text-gold sm:text-2xl">{active.name}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
