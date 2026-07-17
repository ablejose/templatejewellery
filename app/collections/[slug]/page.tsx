import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
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
 * The page title is the group title (e.g. "Gold & Silver"). Below it a
 * "Categories" heading, then each category (e.g. "Mehza - Arabic collection")
 * renders as its own heading + a grid of curved product cards (image + name),
 * with a WhatsApp enquiry icon at the bottom-right of the section. Fully
 * config-driven from BRAND.collections, so adding categories/products (or new
 * groups such as Diamond and Platinum) needs no code changes here.
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

          <h1 className="text-center font-display text-display-l font-bold tracking-tight text-gold">
            {group.title}
          </h1>

          <div className="flex flex-col gap-16">
            <h2 className="font-display text-display-m font-bold text-black">
              Categories
            </h2>

            {group.categories.map((category) => {
              const message = `Hello ${BRAND.businessName}, I'd like to know more about the ${category.title} (${group.title}).`;
              return (
                <section key={category.title} className="flex flex-col gap-8">
                  <h3 className="font-display text-2xl font-bold text-black sm:text-3xl">
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                    {category.products.map((product) => (
                      <figure key={product.image} className="flex flex-col">
                        <div className="overflow-hidden rounded-card border border-black/10 bg-white shadow-md">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={product.width}
                            height={product.height}
                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 18vw"
                            className="aspect-square w-full object-cover"
                          />
                        </div>
                        <figcaption className="mt-3 text-center font-sans text-body font-medium text-black">
                          {product.name}
                        </figcaption>
                        {product.description ? (
                          <p className="mt-1 text-center font-sans text-sm text-neutral-600">
                            {product.description}
                          </p>
                        ) : null}
                      </figure>
                    ))}
                  </div>

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
