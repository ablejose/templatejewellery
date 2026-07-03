import type { BrandConfig } from "@/types/brand";

/** Resolve the public site URL, preferring the environment variable. */
export function getSiteUrl(brand: BrandConfig): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? brand.seo.canonical).replace(
    /\/$/,
    "",
  );
}

/**
 * Build JSON-LD structured data (Organization, one JewelryStore per outlet,
 * WebSite). Reference: Document 3 §7.
 */
export function buildJsonLd(brand: BrandConfig): Record<string, unknown>[] {
  const url = getSiteUrl(brand);
  const sameAs = [brand.instagram, brand.facebook, brand.youtube].filter(
    (v): v is string => Boolean(v),
  );

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.businessName,
    url,
    logo: `${url}${brand.logo}`,
    sameAs,
  };

  const localBusinesses = brand.branches.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: branch.name,
    image: brand.storeImages,
    url,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street,
      addressLocality: branch.city,
      addressRegion: branch.state,
      postalCode: branch.pincode,
      addressCountry: "IN",
    },
    openingHours: ["Mo-Sa 09:30-20:00", "Su 10:00-19:00"],
    sameAs,
  }));

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.businessName,
    url,
  };

  const schemas: Record<string, unknown>[] = [
    organization,
    ...localBusinesses,
    website,
  ];

  // FAQPage schema powers FAQ rich results in search. Emitted only when FAQ
  // content exists (sections/Faq.tsx renders the same BRAND.faq as an accordion).
  if (brand.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: brand.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return schemas;
}
