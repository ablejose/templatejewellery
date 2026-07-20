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
 * Right-to-left seamless looping strip of collection preview cards. Reuses the
 * global `.showroom-marquee-track` animation (the track holds two copies of the
 * images and translates -50% for a seamless loop). The strip runs continuously
 * and never pauses on hover; each card links to the group's detail page.
 *
 * Each card has a fixed height and a width derived from the image's own aspect
 * ratio (CSS `aspect-ratio` on the flex item), so every image is shown in full
 * at its natural proportions — never cropped or zoomed — on both mobile and
 * desktop. Reduced-motion users get a static strip (handled globally in
 * globals.css).
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
      <ul className="showroom-marquee-track flex w-max" style={trackStyle}>
        {loop.map((img, index) => (
          <li
            key={`${img.src}-${index}`}
            className="relative h-72 shrink-0 overflow-hidden rounded-lg sm:h-80"
            style={{
              aspectRatio: `${img.width || 1} / ${img.height || 1}`,
              marginRight: `${GAP_PX}px`,
            }}
          >
            <Link href={href} aria-label={`View ${label}`} className="absolute inset-0 block">
              <Image
                src={img.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 70vw, 340px"
                draggable={false}
                className="select-none object-cover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
