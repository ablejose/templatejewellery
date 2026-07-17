import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { ProductGrid } from "@/components/ProductGrid";
import { whatsappHref } from "@/lib/format";

interface CollectionPageProps {
  params: { slug: string };
}

/** Pre-render a static page for every configured collection group. */
export function generateStaticParams() {
  return BRAND.collections.groups.map((group) => ({ slug: group.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const group = BRAND.collections.groups.find((g) => g.slug === params.slug);
  if (!group) return { title: "Collection" };
  return {
    title: group.title,
    description: `Explore the ${group.title} collection at ${BRAND.businessName}.`,
  };
}

/**
 * Collection detail page (light/white theme, matching Offers & Schemes).
 *
 * The page title is the group title (e.g. "Gold & Silver"), left aligned in a
 * bolder, brighter gold (gold-bright). Below it a "Categories" heading in the
 * navbar's faded-black tone, then each category (e.g. "Mehza - Arabic
 * collection") renders as a gold heading + a grid of curved product cards.
 * Clicking a card opens a near-fullscreen lightbox (see ProductGrid). Each
 * category has a WhatsApp enquiry icon at the bottom-right. Fully config-driven
 * from BRAND.collections, so adding categories/products (or new groups such as
 * Diamond and Platinum) needs no code changes here.
 */
export default function CollectionPage({ params }: CollectionPageProps) {
  const group = BRAND.collections.groups.find((g) => g.slug === params.slug);
  if (!group) notFound();

  return (
    <>
      <Navbar homeHref="/" solid />
      <main className="min-h-screen bg-white text-black">
        <div className="container-lux flex min-h-screen flex-col gap-12 py-20 md:py-24">
          <Link
            href="/"
            className="btn self-start border border-gold/70 text-black hover:border-gold hover:text-gold"
            aria-label="Back to home"
          >
            &larr; Back
          </Link>

          {/* Group title — left aligned, bolder + brighter gold. */}
          <h1 className="text-left font-display text-display-l font-bold tracking-tight text-gold-bright">
            {group.title}
          </h1>

          <div className="flex flex-col gap-16">
            {/* "Categories" in the navbar background tone (faded black). */}
            <h2 className="font-display text-display-m font-bold text-background/70">
              Categories
            </h2>

            {group.categories.map((category) => {
              const message = `Hello ${BRAND.businessName}, I'd like to know more about the ${category.title} (${group.title}).`;
              return (
                <section key={category.title} className="flex flex-col gap-8">
                  {/* Category heading — gold, same display serif as the title. */}
                  <h3 className="font-display text-2xl font-bold text-gold sm:text-3xl">
                    {category.title}
                  </h3>

                  <ProductGrid products={category.products} />

                  {/* WhatsApp enquiry for this category — bottom-right. */}
                  <div className="flex justify-end">
                    <a
                      href={whatsappHref(BRAND.whatsapp, message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${category.title} on WhatsApp`}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-background shadow-lg transition-transform duration-300 ease-lux hover:-translate-y-0.5"
                    >
                      <WhatsAppGlyph />
                    </a>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}
