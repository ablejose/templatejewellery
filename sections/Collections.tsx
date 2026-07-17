import Link from "next/link";
import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CollectionMarquee } from "@/components/CollectionMarquee";

/**
 * "Our Collections" home showcase (positioned right after the Hero).
 *
 * The SectionHeading is the main title. Each collection group (Gold & Silver
 * now; Diamond and Platinum later) renders as a subsection: the group title on
 * the left with a small "View All" pill on the right, above the top of the
 * images, then a right-to-left seamless looping strip of enlarged, elongated
 * preview cards (CollectionMarquee). The cards pause on hover, zoom slightly,
 * and link to the group's detail page at /collections/{slug} — as does
 * "View All". Driven entirely by BRAND.collections.
 */
export function Collections() {
  const { eyebrow, heading, subtitle, groups } = BRAND.collections;
  if (groups.length === 0) return null;

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
                {/* Subsection header: title left, small View All button right,
                    positioned above the top of the image strip. */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-display-m text-ivory">
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

                <CollectionMarquee
                  images={group.marqueeImages}
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
