"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrolled } from "@/hooks/useScrolled";
import { BRAND } from "@/config/brand";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Visit Store", href: "#visit-store" },
  { label: "Schemes", href: "/schemes" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  /**
   * Prefix applied to in-page hash links so they resolve to the homepage's
   * sections. "" on the homepage (plain #about → smooth scroll); "/" on
   * subpages (/#about → navigate home, then scroll to the section).
   */
  homeHref?: string;
  /**
   * Force the solid dark bar regardless of scroll position. Used on the
   * light/white subpages (Offers, Schemes) where the transparent top state
   * with light text would be unreadable.
   */
  solid?: boolean;
}

/**
 * Sticky navigation. Scrolled state becomes more opaque with backdrop blur and
 * reduced padding (Document 2 §3). Mobile uses a full-screen overlay menu.
 * On light subpages pass `solid` so the bar stays dark (keeping the light text
 * readable) and `homeHref="/"` so the section anchors point back to the home
 * page instead of doing nothing.
 *
 * Brand mark: the "HAYAZ" wordmark only (no ring / no "Gold & Diamonds"
 * subtitle), set in the display serif (Cormorant) to match the logo lettering,
 * uppercase with wide tracking in gold. Size adapts across breakpoints.
 */
export function Navbar({ homeHref = "", solid = false }: NavbarProps = {}) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const showSolid = solid || scrolled;
  const resolve = (href: string) =>
    href.startsWith("#") ? `${homeHref}${href}` : href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-lux ${
        showSolid
          ? "border-b border-border bg-background/85 py-3 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-lux flex items-center justify-between" aria-label="Primary">
        <Link href={resolve("#top")} className="flex items-center" aria-label={`${BRAND.businessName} home`}>
          <span className="font-display text-2xl uppercase leading-none tracking-[0.2em] text-gold sm:text-3xl">
            Hayaz
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={resolve(link.href)}
                className="font-sans text-sm tracking-wide text-muted transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-border text-ivory md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-10 bg-background md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={resolve(link.href)}
              onClick={() => setOpen(false)}
              className="font-display text-display-m text-ivory"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
