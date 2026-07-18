import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { ProductGrid } from "@/components/ProductGrid";

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
 * Collection detail page (light/white theme).
 *
 * Title = the group title (e.g. "Gold & Silver"), left aligned in the Playfair
 * display font (distinct from the site's Cormorant) and a bolder, brighter
 * gold. "Categories" uses the front-page eyebrow treatment (Inter, uppercase,
 * tracked, gold). Each category (e.g. "Mehza - Arabic collection") is a gold
 * Cormorant heading over a grid of curved product cards; each card carries its
 * own small WhatsApp enquiry button and opens a near-fullscreen lightbox on
 * click (see ProductGrid). Config-driven from BRAND.collections — new
 * categories/products or groups (Diamond, Platinum) need no code changes here.
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

          {/* Group title — left aligned, Playfair display, bolder + brighter gold. */}
          <h1 className="text-left font-title text-display-l font-bold tracking-tight text-gold-bright">
            {group.title}
          </h1>

          <div>
            {/* "Categories" — front-page eyebrow style (Inter, uppercase, gold). */}
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-gold-bright">
              Categories
            </h2>

            {/* Small gap above the first category heading; categories spaced apart. */}
            <div className="mt-4 flex flex-col gap-14">
              {group.categories.map((category, index) => (
                <section key={category.title} className="flex flex-col gap-6">
                  {/* Category heading - numbered, bright gold, left aligned, with a
                      single horizontal gold line running out to the right edge. */}
                  <div className="flex items-center gap-4">
                    <h3 className="shrink-0 font-display text-2xl font-bold text-gold-bright sm:text-3xl">
                      {index + 1}. {category.title}
                    </h3>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-gold-bright/70 to-gold-bright/20" />
                  </div>

                  <ProductGrid products={category.products} />
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
