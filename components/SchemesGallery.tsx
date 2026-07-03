"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";
import { SchemeIcon } from "@/components/SchemeIcon";

/**
 * /schemes page.
 *
 * - "Our Schemes" title in rich gold.
 * - A shared hero image framed on a pure-white card with a thin gold border, so
 *   it shows uncompressed and centred. Two swappable tabs sit at the image's
 *   top-right corner: "Golden Flexi Schemes" and "Golden Dreams Advanced Plan".
 * - On scroll, three feature cards (icon + heading + body) for the active tab.
 * - A "Find the Best Plan" section with two swappable tabs on the left whose
 *   content differs per scheme (filled in later via BRAND.schemesPage).
 *
 * Responsive: the hero tabs stack compactly at the top-right on phones and sit
 * inline on larger screens; feature cards are 1-up on mobile / 3-up on laptop;
 * the plan tabs are a top row on mobile and a left rail on laptop. Nothing is
 * cropped or distorted at any breakpoint.
 */
export function SchemesGallery() {
  const page = BRAND.schemesPage;
  const [tab, setTab] = useState(0);
  const [plan, setPlan] = useState(0);

  const active = page.tabs[tab] ?? page.tabs[0];
  const activePlan = active.planTabs[plan] ?? active.planTabs[0];

  const selectTab = (index: number) => {
    setTab(index);
    setPlan(0);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container-lux flex min-h-screen flex-col gap-14 py-24 md:py-28">
        <Link href="/" className="btn-secondary self-start" aria-label="Back to home">
          &larr; Back
        </Link>

        <h1 className="text-center font-display text-display-l font-bold tracking-tight text-gold">
          {page.title}
        </h1>

        {/* Hero: white framed card with a thin gold border, image centred. */}
        <div className="relative mx-auto w-full max-w-4xl rounded-card border border-gold bg-white p-3 shadow-2xl sm:p-4">
          <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-2 sm:right-5 sm:top-5">
            {page.tabs.map((t, index) => (
              <button
                key={t.label}
                type="button"
                onClick={() => selectTab(index)}
                aria-pressed={tab === index}
                className={`whitespace-nowrap rounded-pill border px-3 py-1.5 text-[11px] font-medium transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  tab === index
                    ? "border-gold bg-gold text-background"
                    : "border-gold/50 bg-white/85 text-background/75 backdrop-blur hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Image
            src={page.heroImage}
            alt={`${BRAND.businessName} — ${active.label}`}
            width={page.heroWidth}
            height={page.heroHeight}
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 80vw, 896px"
            className="mx-auto h-auto w-full object-contain"
            priority
          />
        </div>

        {/* Feature cards for the active hero tab. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {active.features.map((feature) => (
            <div
              key={feature.heading}
              className="flex flex-col gap-4 rounded-card border border-border bg-white/5 p-6"
            >
              <SchemeIcon name={feature.icon} className="h-9 w-9 shrink-0 text-gold" />
              <h3 className="font-display text-xl text-ivory">{feature.heading}</h3>
              <p className="font-sans text-body text-muted">{feature.body}</p>
            </div>
          ))}
        </div>

        {/* Find the Best Plan: left swappable tabs + content. */}
        <div>
          <h2 className="font-display text-display-m text-gold">{page.findBestPlanHeading}</h2>

          <div className="mt-8 flex flex-col gap-6 md:flex-row">
            <div className="flex flex-row gap-3 md:w-64 md:shrink-0 md:flex-col">
              {active.planTabs.map((planTab, index) => (
                <button
                  key={planTab.heading}
                  type="button"
                  onClick={() => setPlan(index)}
                  aria-pressed={plan === index}
                  className={`flex-1 rounded-card border px-4 py-3 text-left font-sans text-body transition-colors duration-300 md:flex-none ${
                    plan === index
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted hover:text-ivory"
                  }`}
                >
                  {planTab.heading}
                </button>
              ))}
            </div>

            <div className="min-h-[9rem] flex-1 rounded-card border border-border bg-white/5 p-6">
              <h3 className="font-display text-xl text-ivory">{activePlan.heading}</h3>
              <p className="mt-3 whitespace-pre-line font-sans text-body text-muted">
                {activePlan.body ?? "Details coming soon."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
