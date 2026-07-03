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

/**
 * Sticky navigation. Scrolled state becomes more opaque with backdrop blur and
 * reduced padding (Document 2 §3). Mobile uses a full-screen overlay menu.
 */
export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-lux ${
        scrolled
          ? "border-b border-border bg-background/85 py-3 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-lux flex items-center justify-between" aria-label="Primary">
        <Link href="#top" className="flex items-center gap-3" aria-label={`${BRAND.businessName} home`}>
          <span className="font-display text-xl tracking-wide text-ivory">
            {BRAND.businessName}
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
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
              href={link.href}
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
