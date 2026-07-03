"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";

/**
 * /schemes page content.
 *
 * Two buttons sit side by side (one per scheme in BRAND.schemes). Clicking a
 * button reveals that scheme's Cloudinary image below. Includes the same
 * floating WhatsApp button used across the rest of the site.
 *
 * Responsive: the buttons stay in a horizontal row on every breakpoint (their
 * labels wrap on narrow phones), and the revealed image scales to the viewport
 * using its intrinsic dimensions — no distortion or layout shift on mobile or
 * laptop.
 */
export function SchemesGallery() {
  const schemes = BRAND.schemes;
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : schemes[active];

  return (
    <main className="min-h-screen bg-background">
      <div className="container-lux flex min-h-screen flex-col items-center gap-8 py-24 md:py-28">
        <Link href="/" className="btn-secondary self-start" aria-label="Back to home">
          &larr; Back
        </Link>

        <div className="flex w-full max-w-2xl flex-row gap-3 sm:gap-4">
          {schemes.map((scheme, index) => (
            <button
              key={scheme.image}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              className={`${active === index ? "btn-primary" : "btn-secondary"} flex-1 px-4 text-center sm:px-6`}
            >
              {scheme.label}
            </button>
          ))}
        </div>

        {selected ? (
          <div className="w-full max-w-2xl overflow-hidden rounded-card border border-border">
            <Image
              src={selected.image}
              alt={selected.label}
              width={selected.width}
              height={selected.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 672px"
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        ) : null}
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
