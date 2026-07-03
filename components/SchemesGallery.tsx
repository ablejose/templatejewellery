"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/config/brand";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";
import { SchemeIcon } from "@/components/SchemeIcon";

/**
 * /schemes page (light theme).
 *
 * - Full white background.
 * - "Our Schemes" title in rich gold (the only heading kept gold).
 * - Two text tabs above the hero image (Golden Flexi Schemes / Golden Dreams
 *   Advanced Plan) in the serif display font — larger, not bold. The active tab
 *   is dark golden with an underline; the inactive one is grey.
 * - A shared hero image framed on a pure-white card with a thin gold border, so
 *   it shows uncompressed and centred.
 * - Per-tab feature cards: bold heading, normal-weight body text.
 * - A "Find the Best Plan" section with two swappable tabs on the left; each
 *   active plan shows bold bullet points and a small "terms apply" note.
 *
 * Responsive: tabs wrap and stay centred on mobile; feature cards are 1-up on
 * mobile / 3-up on laptop; plan tabs are a top row on mobile and a left rail on
 * laptop. Nothing is cropped or distorted at any breakpoint.
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
    <main className="min-h-screen bg-white text-black">
      <div className="container-lux flex min-h-screen flex-col gap-12 py-20 md:py-24">
        <Link
          href="/"
          className="btn self-start border border-gold/70 text-black hover:border-gold hover:text-gold"
          aria-label="Back to home"
        >
          &larr; Back
        </Link>

        <h1 className="text-center font-display text-display-l font-bold tracking-tight text-gold">
          {page.title}
        </h1>

        <div>
          {/* Text tabs above the hero image — serif display font, larger, not
              bold. Active tab is dark golden with an underline. */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:gap-x-12">
            {page.tabs.map((t, index) => (
              <button
                key={t.label}
                type="button"
                onClick={() => selectTab(index)}
                aria-pressed={tab === index}
                className={`whitespace-nowrap border-b-2 pb-1 font-display text-lg tracking-wide transition-colors duration-300 sm:text-xl ${
                  tab === index
                    ? "border-[#B8860B] text-[#B8860B]"
                    : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Hero: pure-white card with a thin gold border, image centred. */}
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-card border border-gold bg-white p-3 shadow-xl sm:p-4">
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
        </div>

        {/* Feature cards for the active hero tab. */}
        <div
          className={`grid w-full gap-6 ${
            active.features.length === 2
              ? "mx-auto max-w-4xl grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {active.features.map((feature) => (
            <div
              key={feature.heading}
              className="flex flex-col gap-4 rounded-card border border-black/10 bg-white p-6 shadow-sm"
            >
              <SchemeIcon name={feature.icon} className="h-10 w-10 shrink-0 text-gold" />
              <h3 className="font-display text-xl font-bold">{feature.heading}</h3>
              <p className="font-sans text-body text-neutral-700">{feature.body}</p>
            </div>
          ))}
        </div>

        {/* Find the Best Plan: left swappable tabs + content. */}
        <div>
          <h2 className="font-display text-display-m font-bold text-black">
            {page.findBestPlanHeading}
          </h2>

          <div className="mt-8 flex flex-col gap-6 md:flex-row">
            <div className="flex flex-row gap-3 md:w-64 md:shrink-0 md:flex-col">
              {active.planTabs.map((planTab, index) => (
                <button
                  key={planTab.heading}
                  type="button"
                  onClick={() => setPlan(index)}
                  aria-pressed={plan === index}
                  className={`flex-1 rounded-card border px-4 py-3 text-left font-sans text-body font-bold transition-colors duration-300 md:flex-none ${
                    plan === index
                      ? "border-gold bg-gold/10 text-black"
                      : "border-black/15 text-neutral-500 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {planTab.heading}
                </button>
              ))}
            </div>

            <div className="min-h-[9rem] flex-1 rounded-card border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold">{activePlan.heading}</h3>
              {activePlan.points && activePlan.points.length > 0 ? (
                <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 font-sans text-body font-bold text-black marker:text-gold">
                  {activePlan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 font-sans text-body text-neutral-700">Details coming soon.</p>
              )}
              {activePlan.terms ? (
                <p className="mt-4 font-sans text-xs font-normal text-neutral-500">
                  {activePlan.terms}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
