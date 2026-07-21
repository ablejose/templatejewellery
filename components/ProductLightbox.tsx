"use client";

import { useMemo, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import type { CollectionProduct } from "@/types/brand";

// The lens is 1/5 of the image, so the right-side box shows that region at 5x.
const LENS_FRAC = 0.2;
const ZOOM = 1 / LENS_FRAC;

// High-res but optimized source for the magnified box (background images can't
// go through next/image, so inject Cloudinary transforms here).
function zoomUrl(src: string, width: number): string {
  const marker = "/image/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src;
  const i = src.indexOf(marker);
  const rest = src.slice(i + marker.length);
  if (rest.startsWith("f_") || rest.includes("q_auto")) return src;
  return `${src.slice(0, i)}${marker}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}

/**
 * Fullscreen product viewer. The piece fills the screen; clicking the image
 * turns on a small lens (1/5 of the image) that you drag around inside it, and a
 * small box on the right shows that region magnified. Nothing extra — no grids,
 * controls, or hover.
 */
export function ProductLightbox({
  product,
  onClose,
}: {
  product: CollectionProduct;
  onClose: () => void;
}) {
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  const src = product.image;
  const zoomSrc = useMemo(() => zoomUrl(src, 1600), [src]);
  const ratio =
    product.width && product.height ? `${product.width} / ${product.height}` : "3 / 4";

  const place = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    setPos({ x, y });
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    setOn(true);
    place(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!on || e.buttons !== 1) return; // only while pressed (mouse drag / touch drag)
    place(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  // Lens position (clamped inside the image) and matching magnified position.
  const leftFrac = Math.min(Math.max(pos.x - LENS_FRAC / 2, 0), 1 - LENS_FRAC);
  const topFrac = Math.min(Math.max(pos.y - LENS_FRAC / 2, 0), 1 - LENS_FRAC);
  const denom = 1 - LENS_FRAC;
  const bgX = (leftFrac / denom) * 100;
  const bgY = (topFrac / denom) * 100;

  const lensStyle: CSSProperties = {
    left: `${leftFrac * 100}%`,
    top: `${topFrac * 100}%`,
    width: `${LENS_FRAC * 100}%`,
    height: `${LENS_FRAC * 100}%`,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-pill border border-white/30 text-2xl leading-none text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6 sm:top-6"
      >
        &times;
      </button>

      <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <div
          className={`relative touch-none select-none overflow-hidden rounded-card border border-white/10 bg-black/40 ${on ? "cursor-grab" : "cursor-zoom-in"}`}
          style={{ aspectRatio: ratio, maxHeight: "80vh", maxWidth: "92vw", width: "min(92vw, 620px)" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
        >
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 92vw, 620px"
            className={`object-contain ${on ? "cursor-grab" : "cursor-zoom-in"}`}
            priority
          />
          {on ? (
            <div
              className="pointer-events-none absolute border-2 border-gold bg-gold/10"
              style={lensStyle}
            />
          ) : null}
        </div>
        <p className="text-center font-display text-xl text-gold sm:text-2xl">{product.name}</p>
      </div>

      {/* Small magnified box on the right — only after the image is clicked. */}
      {on ? (
        <div
          className="pointer-events-none absolute right-4 top-1/2 w-[38vw] max-w-[260px] -translate-y-1/2 overflow-hidden rounded-lg border-2 border-gold bg-black shadow-2xl"
          style={{
            aspectRatio: ratio,
            backgroundImage: `url("${zoomSrc}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${ZOOM * 100}%`,
            backgroundPosition: `${bgX}% ${bgY}%`,
          }}
        />
      ) : null}
    </div>
  );
}
