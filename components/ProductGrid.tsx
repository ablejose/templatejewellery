"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { whatsappHref } from "@/lib/format";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import type { CollectionProduct } from "@/types/brand";

/**
 * Product grid with per-item WhatsApp enquiry + a near-fullscreen lightbox.
 *
 * Each product is a curved card: the image (click to open the lightbox), a
 * small WhatsApp button tucked into the top-right corner (enquiry pre-filled
 * with the product name), and a caption band — aligned to the image width in a
 * faded golden-grey (gold-muted) — carrying the product name. Clicking the
 * image opens it almost full screen (dark backdrop; click outside, the close
 * button, or Escape dismisses it; body scroll locked). Client-side so the
 * detail page can remain a server component.
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
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.image}
            className="group relative flex flex-col overflow-hidden rounded-card border border-black/10 bg-white shadow-md transition-transform duration-300 ease-lux hover:-translate-y-1 hover:shadow-xl"
          >
            <button
              type="button"
              onClick={() => setActive(product)}
              aria-label={`View ${product.name}`}
              className="block w-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={product.width}
                height={product.height}
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 18vw"
                className="aspect-square w-full object-cover"
              />
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

            {/* Caption band — aligned to the image width, faded golden-grey. */}
            <span className="w-full bg-gold-muted px-3 py-2.5 text-center font-display text-sm font-medium tracking-wide text-background sm:text-base">
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
