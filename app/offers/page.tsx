import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { PromoImagePage } from "@/components/PromoImagePage";

export const metadata: Metadata = {
  title: "Offers",
  description: `Current offers at ${BRAND.businessName}.`,
};

export default function OffersPage() {
  return (
    <PromoImagePage
      src={BRAND.offersImage}
      alt={`${BRAND.businessName} current offers`}
      title="Offers"
      width={1131}
      height={1600}
    />
  );
}
