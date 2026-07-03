import Image from "next/image";
import type { CSSProperties } from "react";
import type { MarqueeImage } from "@/types/brand";

/**
 * Seconds of scroll time per unit of summed aspect-ratio. Shared by EVERY
 * marquee so all strips crawl at the same pixel speed regardless of how many
 * images they hold or those images' proportions. Larger = slower.
 */
const SECONDS_PER_ASPECT_UNIT = 12;

/**
 * Slight gap between images (px) so each image reads as its own frame. A
 * trailing gap is applied to EVERY image (including the last of each set), so
 * the repeating unit stays uniform and the -50% loop is seamless (no jump at
 * the wrap). The dark section background shows through the gap.
 */
const GAP_PX = 12;

/**
 * Reference strip height (matches md:h-64 = 256px). Used only to express the
 * fixed pixel gap in aspect-ratio units so it can be folded into the duration,
 * keeping every strip's crawl speed matched.
 */
const REFERENCE_HEIGHT_PX = 256;

interface ShowroomMarqueeProps {
  images: MarqueeImage[];
  label: string;
}

/**
 * Edge-to-edge storefront image strip that loops right -> left forever with a
 * slight, uniform gap between images (Visit Our Stores). The track holds TWO
 * consecutive copies of the images and translates by -50% (exactly one set),
 * so the loop is seamless. Height is fixed + responsive; each image's width
 * follows its intrinsic aspect ratio, so there is no distortion and no layout
 * shift. Users who prefer reduced motion get a static strip (handled globally
 * in globals.css).
 */
export function ShowroomMarquee({ images, label }: ShowroomMarqueeProps) {
  if (images.length === 0) return null;

  const sumAspect = images.reduce(
    (sum, img) => sum + img.width / img.height,
    0,
  );
  // One repeating unit = every image plus its trailing gap. Expressing the gap
  // in aspect units (gap / height) folds it into the duration, so adding a gap
  // does not change the shared crawl speed between strips.
  const gapUnits = (images.length * GAP_PX) / REFERENCE_HEIGHT_PX;
  const durationSec = Math.max(
    1,
    Math.round((sumAspect + gapUnits) * SECONDS_PER_ASPECT_UNIT),
  );
  const loop = [...images, ...images];

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
            className="h-48 shrink-0 sm:h-56 md:h-64"
            style={{ marginRight: `${GAP_PX}px` }}
          >
            <Image
              src={img.src}
              alt=""
              aria-hidden="true"
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 60vw, 480px"
              draggable={false}
              className="block h-full w-auto select-none object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
