import { BRAND } from "@/config/brand";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreImage } from "@/components/StoreImage";
import { Button } from "@/components/Button";
import { telHref } from "@/lib/format";

/**
 * Visit Store (Document 2 §7). Three responsive storefront images, business
 * details, and action buttons. Google Maps is linked, never embedded.
 */
export function VisitStore() {
  return (
    <section id="visit-store" className="py-24 md:py-32">
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            eyebrow="Come See Us"
            title="Visit Our Store"
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
          <div className="mt-12 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-display text-display-m text-ivory">{BRAND.businessName}</h3>
              <p className="mt-3 max-w-md font-sans text-body text-muted">{BRAND.address}</p>
              <p className="mt-2 font-sans text-body text-muted">{BRAND.openingHours}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={BRAND.mapsLink} external variant="secondary">
                  Get Directions
                </Button>
                <Button href={telHref(BRAND.phone)} variant="primary">
                  Call Now
                </Button>
              </div>
              <Button href="/offers" variant="primary" className="sm:self-end">
                Offers
              </Button>
              <Button href="/schemes" variant="secondary" className="sm:self-end">
                Schemes
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
