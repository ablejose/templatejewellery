import type { Metadata } from "next";
import Image from "next/image";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { getManifest } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Offers",
  description: `Current offers at ${BRAND.businessName}.`,
};

export const revalidate = 30;

export default async function OffersPage() {
  const manifest = await getManifest();
  const offers = manifest.offers;

  return (
    <>
      <Navbar homeHref="/" solid />
      <main className="min-h-screen bg-white text-black">
        <div className="container-lux flex min-h-screen flex-col gap-10 py-24 md:py-28">
          <h1 className="text-center font-title text-display-l font-bold tracking-tight text-gold-bright">
            Offers
          </h1>

          {offers.length === 0 ? (
            <p className="py-20 text-center font-sans text-lg text-black/60">
              No current offers. Please check back soon.
            </p>
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
              {offers.map((offer) => (
                <div
                  key={offer.publicId}
                  className="overflow-hidden rounded-card border border-black/10 shadow-md"
                >
                  <Image
                    src={offer.url}
                    alt={`${BRAND.businessName} offer`}
                    width={offer.width}
                    height={offer.height}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
