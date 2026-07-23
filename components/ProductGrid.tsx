"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { whatsappHref } from "@/lib/format";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { ProductLightbox } from "@/components/ProductLightbox";
import type { CollectionProduct } from "@/types/brand";

/**
 * Product grid with per-item WhatsApp enquiry + a near-fullscreen lightbox.
 *
 * Every card is uniform regardless of the source crop: a fixed elongated
 * portrait frame (aspect-[3/4]) that shows the whole piece (object-contain,
 * never cropped) directly on the card's plain background. The uploaded photo is
 * shown as-is — no blurred fill copy and no feathered edge behind it. A caption
 * band flexes to fill so all cards in a row match height even when a name wraps.
 * Each card has a small WhatsApp button tucked into the top-right corner
 * (enquiry pre-filled with the product name); clicking the image opens a
 * fullscreen viewer with a magnifier (ProductLightbox) so shoppers can zoom
 * around the piece. Client-side so the detail page can remain a server component.
 */

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
              {/* Fixed portrait frame. The uploaded photo is shown as-is
                  (object-contain, never cropped) on the card's plain
                  background — no blurred backdrop or feathered edge glow. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 18vw"
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
        <ProductLightbox key={active.image} product={active} onClose={() => setActive(null)} />
      ) : null}
    </>
  );
}
