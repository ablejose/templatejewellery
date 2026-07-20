"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import Image from "next/image";
import type { MarqueeImage } from "@/types/brand";

const HOLD_MS = 1500; // how long each image is held before it auto-swipes
const SWIPE_MS = 500; // swipe (slide) transition duration

interface CollectionCarouselProps {
  images: MarqueeImage[];
  label: string;
}

/**
 * Full-width, one-image-at-a-time gallery for the home "Our Collections"
 * section. Each image is held ~1.5s, then swipes to the next (seamless forward
 * loop via a cloned first slide). Bare prev/next arrows let users skip in either
 * direction (they turn gold on hover); touch swipe works too. Autoplay pauses on
 * hover/touch. Falls back to a single static image when a group has only one
 * preview image.
 */
export function CollectionCarousel({ images, label }: CollectionCarouselProps) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDelta = useRef(0);

  const goNext = useCallback(() => {
    setAnimate(true);
    setIndex((i) => (i >= count ? count : i + 1));
  }, [count]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }
    // Wrap from the first image to the last: jump (no animation) to the cloned
    // first slide, then animate back to the last real slide on the next frame.
    setAnimate(false);
    setIndex(count);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(count - 1);
      });
    });
  }, [count, index]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = window.setInterval(goNext, HOLD_MS + SWIPE_MS);
    return () => window.clearInterval(id);
  }, [count, paused, goNext]);

  // After a no-animation jump (seamless-loop reset / prev-wrap), re-enable the
  // transition on the next frame.
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  if (count === 0) return null;

  const slides = count > 1 ? [...images, images[0]] : images;

  const handleTransitionEnd = () => {
    if (count > 1 && index >= count) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
    setPaused(true);
  };
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const d = touchDelta.current;
    touchStartX.current = null;
    touchDelta.current = 0;
    setPaused(false);
    if (count <= 1) return;
    if (d < -40) {
      goNext();
    } else if (d > 40) {
      goPrev();
    }
  };

  const trackStyle: CSSProperties = {
    transform: `translateX(-${index * 100}%)`,
    transition: animate ? `transform ${SWIPE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
  };

  const activeDot = index % count;
  const arrowClass =
    "absolute top-1/2 z-10 -translate-y-1/2 p-2 text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition-colors duration-200 hover:text-gold-bright focus-visible:text-gold-bright focus:outline-none";

  return (
    <div
      className="relative w-full overflow-hidden rounded-card border border-border bg-black/20"
      role="group"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex" style={trackStyle} onTransitionEnd={handleTransitionEnd}>
        {slides.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-[27rem] w-full shrink-0 sm:h-[30rem]"
          >
            <Image
              src={img.src}
              alt=""
              aria-hidden="true"
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 100vw, 1280px"
              draggable={false}
              priority={i === 0}
              className="h-full w-full select-none object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className={`${arrowClass} left-2 sm:left-4`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className={`${arrowClass} right-2 sm:right-4`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {images.map((img, i) => (
              <span
                key={`dot-${img.src}-${i}`}
                className={`h-2 rounded-pill transition-all duration-300 ${
                  i === activeDot ? "w-6 bg-gold" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
