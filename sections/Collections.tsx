import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CollectionMarquee } from "@/components/CollectionMarquee";
import { getManifest } from "@/lib/cloudinary";
import { GROUPS } from "@/lib/collections";
import type { MarqueeImage } from "@/types/brand";

export async function Collections() {
  const manifest = await getManifest();

  const groups = GROUPS.map((g) => {
    const cats = manifest.groups[g.slug]?.categories ?? [];
    const images: MarqueeImage[] = cats
      .flatMap((c) => c.products)
      .slice(0, 12)
      .map((p) => ({ src: p.url, width: p.width, height: p.height }));
    return { slug: g.slug, title: g.title, images };
  }).filter((g) => g.images.length > 0);

  if (groups.length === 0) return null;

  const { eyebrow, heading, subtitle } = BRAND.collections;

  return (
    <section id="collections" className="py-24 md:py-32">
      <div className="container-lux">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} />
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {groups.map((group) => (
            <Reveal key={group.slug}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-display-m text-ivory">{group.title}</h3>
                  <Link
                    href={`/collections/${group.slug}`}
                    aria-label={`View all ${group.title}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-pill border border-gold/60 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.12em] text-gold transition-colors duration-300 ease-lux hover:border-gold hover:bg-gold hover:text-background"
                  >
                    View All
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>

                <CollectionMarquee
                  images={group.images}
                  href={`/collections/${group.slug}`}
                  label={`${group.title} collection`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
