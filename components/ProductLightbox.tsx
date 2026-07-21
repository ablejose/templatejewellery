"use client";

import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import type { CollectionProduct } from "@/types/brand";

const ZOOM_MIN = 1.5;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.5;

// Gold grid overlay reused on the stage, the zoom box, and the navigator — the
// "grids" that make it easy to orient while zooming around.
const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(212,175,55,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.22) 1px, transparent 1px)",
  backgroundSize: "25% 25%",
};

// High-res but optimized source for the magnified box/navigator (background
// images can't go through next/image, so inject Cloudinary transforms here).
function zoomUrl(src: string, width: number): string {
  const marker = "/image/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src;
  const i = src.indexOf(marker);
  const rest = src.slice(i + marker.length);
  if (rest.startsWith("f_") || rest.includes("q_auto")) return src;
  return `${src.slice(0, i)}${marker}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}

/**
 * Fullscreen product viewer with a magnifier. Shown only after a product is
 * clicked. Hover (desktop) or drag (touch) over the main image — or drag on the
 * grid navigator — to move a lens; the right-side box shows that region
 * magnified. A gold grid overlays the stage, the zoom box, and the navigator so
 * it is easy to zoom around a specific part of the piece.
 */
export function ProductLightbox({
  product,
  onClose,
}: {
  product: CollectionProduct;
  onClose: () => void;
}) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [zoom, setZoom] = useState(2.5);

  const src = product.image;
  const zoomSrc = useMemo(() => zoomUrl(src, 1600), [src]);
  const ratio =
    product.width && product.height ? `${product.width} / ${product.height}` : "3 / 4";

  const setFromPoint = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    setPos({ x, y });
  }, []);

  const onMouse = (e: ReactMouseEvent<HTMLDivElement>) =>
    setFromPoint(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  const onMouseDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    setFromPoint(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };
  const onTouch = (e: ReactTouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    setFromPoint(t.clientX, t.clientY, e.currentTarget.getBoundingClientRect());
  };

  // Lens geometry (as fractions of the image), clamped inside the frame.
  const lensFrac = 1 / zoom;
  const leftFrac = Math.min(Math.max(pos.x - lensFrac / 2, 0), 1 - lensFrac);
  const topFrac = Math.min(Math.max(pos.y - lensFrac / 2, 0), 1 - lensFrac);
  const denom = 1 - lensFrac;
  const bgX = denom > 0 ? (leftFrac / denom) * 100 : 0;
  const bgY = denom > 0 ? (topFrac / denom) * 100 : 0;

  const lensStyle: CSSProperties = {
    left: `${leftFrac * 100}%`,
    top: `${topFrac * 100}%`,
    width: `${lensFrac * 100}%`,
    height: `${lensFrac * 100}%`,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-pill border border-white/30 text-2xl leading-none text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6 sm:top-6"
      >
        &times;
      </button>

      <div
        className="flex w-full max-w-6xl flex-col items-center gap-5 md:flex-row md:items-start md:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main stage — hover (desktop) or drag (touch) to choose the zoom area. */}
        <div className="w-full max-w-[560px]">
          <div
            className="relative mx-auto w-full cursor-crosshair touch-none select-none overflow-hidden rounded-card border border-white/10 bg-black/40"
            style={{ aspectRatio: ratio, maxHeight: "72vh" }}
            onMouseMove={onMouse}
            onTouchStart={onTouch}
            onTouchMove={onTouch}
          >
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-contain"
              priority
            />
            <div className="pointer-events-none absolute inset-0" style={GRID_OVERLAY} />
            <div
              className="pointer-events-none absolute rounded-sm border-2 border-gold/80 bg-gold/10"
              style={lensStyle}
            />
          </div>
          <p className="mt-3 text-center font-display text-xl text-gold sm:text-2xl">
            {product.name}
          </p>
        </div>

        {/* Zoom panel — magnified box, zoom controls, then the grid navigator. */}
        <div className="flex w-full max-w-[360px] shrink-0 flex-col gap-3">
          <div
            className="relative aspect-square w-full overflow-hidden rounded-card border border-gold/40 bg-black"
            style={{
              backgroundImage: `url("${zoomSrc}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${bgX}% ${bgY}%`,
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={GRID_OVERLAY} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1)))}
              className="flex h-9 w-9 items-center justify-center rounded-pill border border-white/30 text-xl leading-none text-white transition-colors hover:border-gold hover:text-gold"
            >
              &minus;
            </button>
            <span className="min-w-[3rem] text-center font-sans text-sm text-ivory">
              {zoom.toFixed(1)}&times;
            </span>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)))}
              className="flex h-9 w-9 items-center justify-center rounded-pill border border-white/30 text-xl leading-none text-white transition-colors hover:border-gold hover:text-gold"
            >
              +
            </button>
          </div>

          {/* Grid navigator — click or drag anywhere to move the zoom region. */}
          <div
            className="relative mx-auto w-full cursor-crosshair touch-none select-none overflow-hidden rounded-lg border border-white/20"
            style={{
              aspectRatio: ratio,
              backgroundImage: `url("${zoomSrc}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseDown={onMouse}
            onMouseMove={onMouseDrag}
            onTouchStart={onTouch}
            onTouchMove={onTouch}
          >
            <div className="pointer-events-none absolute inset-0" style={GRID_OVERLAY} />
            <div
              className="pointer-events-none absolute rounded-sm border-2 border-gold bg-gold/20"
              style={lensStyle}
            />
          </div>
          <p className="text-center font-sans text-xs text-white/60">
            Hover, or drag the grid, to zoom around
          </p>
        </div>
      </div>
    </div>
  );
}
