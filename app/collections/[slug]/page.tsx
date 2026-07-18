import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { getManifest } from "@/lib/cloudinary";
import { GROUPS, groupTitle, isGroupSlug } from "@/lib/collections";
import type { CollectionProduct } from "@/types/brand";

interface CollectionPageProps {
  params: { slug: string };
}

export const revalidate = 30;

/** Pre-render a static page for every collection group. */
export function generateStaticParams() {
  return GROUPS.map((group) => ({ slug: group.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  if (!isGroupSlug(params.slug)) return { title: "Collection" };
  const title = groupTitle(params.slug);
  return {
    title,
    description: `Explore the ${title} collection at ${BRAND.businessName}.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  if (!isGroupSlug(params.slug)) notFound();

  const manifest = await getManifest();
  const title = groupTitle(params.slug);
  const categories = [...(manifest.groups[params.slug]?.categories ?? [])].sort(
    (a, b) => a.order - b.order,
  );

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

          <h1 className="text-left font-title text-display-l font-bold tracking-tight text-gold-bright">
            {title}
          </h1>

          {categories.length === 0 ? (
            <p className="py-16 font-sans text-lg text-black/60">
              This collection is coming soon.
            </p>
          ) : (
            <div>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-gold-bright">
                Categories
              </h2>

              <div className="mt-4 flex flex-col gap-14">
                {categories.map((category, index) => {
                  const products: CollectionProduct[] = category.products.map((p) => ({
                    image: p.url,
                    width: p.width,
                    height: p.height,
                    name: p.name,
                  }));
                  return (
                    <section key={category.id} className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <h3 className="shrink-0 font-display text-2xl font-bold text-gold-bright sm:text-3xl">
                          {index + 1}. {category.name}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="h-px flex-1 bg-gradient-to-r from-gold-bright/70 to-gold-bright/20"
                        />
                      </div>

                      {products.length === 0 ? (
                        <p className="font-sans text-sm text-black/50">No products yet.</p>
                      ) : (
                        <ProductGrid products={products} />
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
