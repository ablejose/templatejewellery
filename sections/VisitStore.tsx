import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreImage } from "@/components/StoreImage";
import { Button } from "@/components/Button";
import { telHref, formatBranchAddress } from "@/lib/format";

/**
 * Visit Store (Document 2 §7). Three responsive storefront images, then both
 * retail outlets with their own address and directions, plus shared opening
 * hours and a Call action. Google Maps is linked, never embedded.
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BRAND.storeImages.map((src, index) => (
            <Reveal key={src} delay={index * 0.08}>
              <StoreImage
                src={src}
                alt={`${BRAND.businessName} storefront view ${index + 1}`}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 border-t border-border pt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {BRAND.branches.map((branch) => (
                <div key={branch.name} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-ivory">{branch.name}</h3>
                    <p className="mt-3 max-w-md font-sans text-body text-muted">
                      {formatBranchAddress(branch)}
                    </p>
                  </div>
                  <Button
                    href={branch.mapsLink}
                    external
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Get Directions
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body text-muted">{BRAND.openingHours}</p>
              <Button href={telHref(BRAND.phone)} variant="primary" className="w-full sm:w-auto">
                Call Now
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
