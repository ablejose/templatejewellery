"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * White full-screen loader shown over a collection ("product") page until its
 * product images have finished loading, so visitors never watch images pop in
 * one by one.
 *
 * It polls the product images (marked by the `data-product-loading` wrapper)
 * that fall in the initial viewport and reveals the page once those are all
 * complete; the rest lazy-load normally as the visitor scrolls. Defensive:
 * reveals immediately when the page has no products, and always reveals after a
 * safety timeout so a slow or broken image can never trap the visitor. Body
 * scroll is locked while the loader is visible; the fade-out has a timeout
 * fallback so it still unmounts if the transitionend event is missed (e.g.
 * prefers-reduced-motion disables the fade).
 */
export function ProductPageLoader({ expected }: { expected: number }) {
  const [ready, setReady] = useState(expected <= 0);
  const [removed, setRemoved] = useState(expected <= 0);

  useEffect(() => {
    if (expected <= 0) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    const allVisibleLoaded = () => {
      const imgs = Array.from(
        document.querySelectorAll<HTMLImageElement>("[data-product-loading] img"),
      );
      if (imgs.length === 0) return false;
      const vh = window.innerHeight || 800;
      const inView = imgs.filter((img) => {
        const r = img.getBoundingClientRect();
        return r.top < vh + 120 && r.bottom > -120;
      });
      const target = inView.length > 0 ? inView : imgs.slice(0, 4);
      return target.every((img) => img.complete);
    };

    if (allVisibleLoaded()) {
      finish();
      return;
    }
    const interval = window.setInterval(() => {
      if (allVisibleLoaded()) finish();
    }, 150);
    const fallback = window.setTimeout(finish, 10000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fallback);
    };
  }, [expected]);

  // Lock scroll only while loading; unlocks as soon as ready.
  useEffect(() => {
    if (ready) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [ready]);

  // Guarantee unmount shortly after ready, even if transitionend is missed.
  useEffect(() => {
    if (!ready || removed) return;
    const t = window.setTimeout(() => setRemoved(true), 900);
    return () => window.clearTimeout(t);
  }, [ready, removed]);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-white transition-opacity duration-700 ease-lux ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={() => {
        if (ready) setRemoved(true);
      }}
    >
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
      <span className="sr-only">Loading collection</span>
    </div>
  );
}
