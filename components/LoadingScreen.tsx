"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Full-screen intro loader.
 *
 * The homepage Hero plays a large Cloudinary film that can take a moment to
 * buffer on slower connections. This overlay covers the viewport with a plain
 * black screen (bg-background) showing the brand mark — the gold ring logo
 * above the gold "HAYAZ" wordmark, matching the Navbar logo container exactly
 * (same display serif, tracking and gold) — until the hero video is ready,
 * then fades out and removes itself from the DOM.
 *
 * It hooks the EXISTING hero <video> (id="hero-video") instead of preloading
 * the file a second time, so there is no duplicate download. A safety timeout
 * guarantees the site is revealed even if the video never signals readiness
 * (it errors, or the event is missed). Rendered in its visible state on the
 * server so it covers the first paint with no flash of content, and it honours
 * prefers-reduced-motion via the global CSS rule (the fade + pulse are frozen
 * for users who opt out).
 */
export function LoadingScreen() {
  // `ready` triggers the fade-out; `removed` unmounts once the fade completes.
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    // readyState >= 2 (HAVE_CURRENT_DATA) means the first frame is available,
    // so the hero already has something to show — safe to reveal.
    if (!video || video.readyState >= 2) {
      finish();
    } else {
      video.addEventListener("loadeddata", finish, { once: true });
      video.addEventListener("canplay", finish, { once: true });
      // Never trap the user behind the loader if the video fails to load.
      video.addEventListener("error", finish, { once: true });
    }

    // Safety fallback (8s) so the site is always revealed eventually.
    const fallback = window.setTimeout(finish, 8000);

    return () => {
      window.clearTimeout(fallback);
      video?.removeEventListener("loadeddata", finish);
      video?.removeEventListener("canplay", finish);
      video?.removeEventListener("error", finish);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-background transition-opacity duration-700 ease-lux ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={() => {
        if (ready) setRemoved(true);
      }}
    >
      {/* Same brand mark as the Navbar logo container: gold ring logo above the
          gold "HAYAZ" wordmark in the display serif — scaled up for the loader. */}
      <Image
        src="/hayaz-logo.png"
        alt=""
        width={181}
        height={182}
        priority
        className="h-20 w-auto animate-pulse sm:h-24"
      />
      <span className="font-display text-xl uppercase leading-none tracking-[0.22em] text-gold sm:text-2xl">
        Hayaz
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
