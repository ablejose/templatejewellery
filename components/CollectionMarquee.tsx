import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MarqueeImage } from "@/types/brand";

interface CollectionMarqueeProps {
  images: MarqueeImage[];
  /** Detail page each card links to (e.g. "/collections/gold-silver"). */
  href: string;
  label: string;
}

/** Slight gap between cards (px). */
const GAP_PX = 16;

/**
 * Right-to-left seamless looping strip of enlarged, elongated collection
 * preview cards. Reuses the global `.showroom-marquee-track` animation (the
 * track holds two copies of the images and translates -50% for a seamless
 * loop). The strip runs continuously and never pauses on hover; each card
 * links to the group's detail page. Each card is a fixed height with
 * automatic width and object-contain, so every image is shown in full
 * (never cropped or zoomed) on mobile and desktop. Reduced-motion users get a
 * static strip (handled globally in globals.css).
 */
export function CollectionMarquee({ images, href, label }: CollectionMarqueeProps) {
  if (images.length === 0) return null;

  const loop = [...images, ...images];
  const durationSec = Math.max(20, images.length * 5);
  const trackStyle: CSSProperties & Record<"--marquee-duration", string> = {
    "--marquee-duration": `${durationSec}s`,
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-card border border-border"
      role="group"
      aria-label={label}
    >
      <ul
        className="showroom-marquee-track flex w-max"
        style={trackStyle}
      >
        {loop.map((img, index) => (
          <li
            key={`${img.src}-${index}`}
            className="shrink-0"
            style={{ marginRight: `${GAP_PX}px` }}
          >
            <Link
              href={href}
              aria-label={`View ${label}`}
              className="inline-flex h-72 overflow-hidden rounded-lg sm:h-80"
            >
              <Image
                src={img.src}
                alt=""
                aria-hidden="true"
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 70vw, 340px"
                draggable={false}
                className="h-full w-auto select-none object-contain"
                style={{ width: "auto" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
