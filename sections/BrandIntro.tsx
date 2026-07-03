import { Reveal } from "@/components/Reveal";

/**
 * Editorial brand introduction (Document 2 §5): a large heading + supporting
 * story on the left, with a minimal decorative divider on the right.
 * Establishes trust before the story chapters begin.
 */
export function BrandIntro() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-lux grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-8">
          <Reveal>
            <h2 className="font-display text-display-l text-ivory">A Story of Success</h2>
            <p className="mt-6 max-w-2xl font-sans text-body-lg text-muted">
              <span className="font-display font-bold text-gold">Hayaz Gold</span>
              {" specializes in gold, diamond, silver and platinum. In 2022 Hayaz started its first outlet in Mannarkkad with 4 employees. Within a short period, we've built a large family of loyal customers across Kerala. It is an achievement that we have been able to turn even those who came to the shop once into Hayaz promoters. Hayaz Gold & Diamonds acknowledges that customers are more sophisticated and their needs are more individualized. We offer quality products in low making charge backed by a deep respect."}
            </p>
          </Reveal>
        </div>
        <div className="hidden md:col-span-4 md:flex md:items-center md:justify-end">
          <div className="h-40 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
