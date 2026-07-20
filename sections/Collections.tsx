import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { CollectionCarousel, type CarouselImage } from "@/components/CollectionCarousel";
import { getManifest } from "@/lib/cloudinary";
import { GROUPS, type ProductItem } from "@/lib/collections";

// Home "Our Collections" scroll: one preview per category (its first image),
// capped at this many categories per group.
const MAX_PREVIEW_CATEGORIES = 5;

export async function Collections() {
  const manifest = await getManifest();

  const groups = GROUPS.map((g) => {
    // Categories in their configured priority (order) sequence.
    const cats = [...(manifest.groups[g.slug]?.categories ?? [])].sort(
      (a, b) => a.order - b.order,
    );

    // One slide per category: the category's first image + its custom name.
    const images: CarouselImage[] = [];
    for (const c of cats) {
      const first: ProductItem | undefined = c.products[0];
      if (first) {
        images.push({ src: first.url, width: first.width, height: first.height, name: c.name });
        if (images.length >= MAX_PREVIEW_CATEGORIES) break;
      }
    }

    return { slug: g.slug, title: g.title, images };
  }).filter((g) => g.images.length > 0);

  if (groups.length === 0) return null;

  const { eyebrow, heading, subtitle } = BRAND.collections;

  return (
    <section id="collections" className="py-24 md:py-32">
      <div className="container-lux">
        <Reveal>
          <div className="flex flex-col items-start gap-4 text-left">
            {eyebrow ? <span className="label-eyebrow">{eyebrow}</span> : null}
            <h2 className="font-display text-display-xl text-ivory">{heading}</h2>
            {subtitle ? (
              <p className="max-w-2xl font-sans text-body-lg text-muted">{subtitle}</p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {groups.map((group) => (
            <Reveal key={group.slug}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="w-fit bg-gradient-to-r from-gold-bright via-gold to-gold-bright bg-clip-text font-display text-display-l font-semibold tracking-tight text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
                    {group.title}
                  </h3>
                  <Link
                    href={`/collections/${group.slug}`}
                    aria-label={`View all ${group.title}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-pill border border-gold/60 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.12em] text-gold transition-colors duration-300 ease-lux hover:border-gold hover:bg-gold hover:text-background"
                  >
                    View All
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>

                <CollectionCarousel
                  images={group.images}
                  label={`${group.title} collection`}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Golden divider: marks the end of Our Collections (after Diamond),
            separating it from the "A Story of Success" section that follows. */}
        <div
          className="mt-20 flex items-center justify-center gap-4 md:mt-24"
          aria-hidden="true"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold-bright/70 sm:w-40" />
          <span className="h-2.5 w-2.5 rotate-45 border border-gold-bright bg-gold-bright/40" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold-bright/70 sm:w-40" />
        </div>
      </div>
    </section>
  );
}
