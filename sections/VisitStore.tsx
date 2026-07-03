import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ShowroomMarquee } from "@/components/ShowroomMarquee";
import { Button } from "@/components/Button";
import { telHref, formatBranchAddress } from "@/lib/format";

/**
 * Visit Store (Document 2 §7). One block per retail outlet: a heading-sized
 * showroom title, an edge-to-edge looping image strip (right -> left, slow,
 * seamless, no gaps), then the outlet's full address with its OWN Directions +
 * Call actions side by side. Google Maps is linked, never embedded. All content
 * comes from BRAND.branches.
 */
export function VisitStore() {
  return (
    <section id="visit-store" className="py-24 md:py-32">
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            eyebrow="Come See Us"
            title="Visit Our Stores"
            subtitle="Experience timeless craftsmanship in person."
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {BRAND.branches.map((branch) => (
            <Reveal key={branch.name}>
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-display-m text-ivory">
                  {branch.area} Showroom
                </h3>

                <ShowroomMarquee
                  images={branch.marqueeImages}
                  label={`${branch.area} showroom gallery`}
                />

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-xl font-sans text-body text-muted">
                    {formatBranchAddress(branch)}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      href={branch.mapsLink}
                      external
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      Get Directions
                    </Button>
                    <Button
                      href={telHref(branch.phone)}
                      variant="primary"
                      className="w-full sm:w-auto"
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
