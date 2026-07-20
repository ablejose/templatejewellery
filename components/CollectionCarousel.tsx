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

const HOLD_MS = 1500; // how long each image is held before it auto-swipes
const SWIPE_MS = 500; // swipe (slide) transition duration

export interface CarouselImage {
  src: string;
  width: number;
  height: number;
  name: string;
}

interface CollectionCarouselProps {
  images: CarouselImage[];
  label: string;
}

// Feather mask: the sharp image is fully opaque toward its centre-right and
// fades to fully transparent at every edge, so it melts seamlessly into the
// blurred copy of the same image behind it (no hard rectangle).
const FEATHER = "radial-gradient(78% 92% at 54% 50%, #000 44%, transparent 100%)";

/**
 * Full-width, one-slide-at-a-time gallery for the home "Our Collections"
 * section. Each slide is a single category: its first image sits sharp on the
 * RIGHT of the frame with feathered edges, a blurred copy of the same image
 * fills the whole frame behind it, and the category's large name is laid over
 * the blurred left side. Slides fade/settle in over 0.5s (see .tj-appear in
 * globals.css). Held ~1.5s, then auto-swipes with a seamless forward loop; bare
 * gold-on-hover arrows and touch swipe skip either way. Autoplay pauses on
 * hover/touch.
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
    // Wrap from the first slide to the last: jump (no animation) to the cloned
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
    "absolute top-1/2 z-20 -translate-y-1/2 p-2 text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)] transition-colors duration-200 hover:text-gold-bright focus-visible:text-gold-bright focus:outline-none";

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
            className="relative h-[27rem] w-full shrink-0 overflow-hidden sm:h-[30rem]"
          >
            <div className="tj-appear absolute inset-0">
              {/* Blurred copy of the same image, filling the whole frame. */}
              <Image
                src={img.src}
                alt=""
                aria-hidden="true"
                width={img.width}
                height={img.height}
                sizes="(max-width: 768px) 100vw, 1280px"
                draggable={false}
                priority={i === 0}
                className="absolute inset-0 h-full w-full scale-110 select-none object-cover blur-2xl brightness-[0.6]"
              />

              {/* Same image, sharp, on the right half, feathered on every edge so
                  it blends seamlessly into the blurred field behind it. */}
              <div className="absolute inset-y-0 right-0 w-[62%] sm:w-[58%]">
                <Image
                  src={img.src}
                  alt={img.name}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 62vw, 760px"
                  draggable={false}
                  priority={i === 0}
                  style={{ WebkitMaskImage: FEATHER, maskImage: FEATHER }}
                  className="h-full w-full select-none object-contain"
                />
              </div>

              {/* Darken the left for the name; fully transparent on the right. */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/45 to-transparent" />

              {/* Category name only, large, over the blurred left side. */}
              <div className="absolute inset-y-0 left-0 z-10 flex w-[56%] flex-col justify-center px-6 sm:px-12">
                <h4 className="w-fit bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text pb-2 font-display text-6xl font-semibold leading-[0.95] text-transparent sm:text-8xl">
                  {img.name}
                </h4>
                <span className="mt-5 h-px w-24 bg-gold-bright/70 sm:w-32" />
              </div>
            </div>
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

          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2">
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
