import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { CollectionCarousel } from "@/components/CollectionCarousel";
import { getManifest } from "@/lib/cloudinary";
import { GROUPS } from "@/lib/collections";
import type { MarqueeImage } from "@/types/brand";

// Home "Our Collections": each section's slideshow shows that section's
// admin-managed banner images (managed in /admin). Sections with no banners
// stay hidden until banners are added.
export async function Collections() {
  const manifest = await getManifest();

  const groups = GROUPS.map((g) => {
    const banners = manifest.groups[g.slug]?.banners ?? [];
    const images: MarqueeImage[] = banners.map((b) => ({
      src: b.url,
      width: b.width,
      height: b.height,
    }));
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
            separating it from the section that follows. */}
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
