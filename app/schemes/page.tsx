import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { PromoImagePage } from "@/components/PromoImagePage";

export const metadata: Metadata = {
  title: "Schemes",
  description: `Savings schemes at ${BRAND.businessName}.`,
};

export default function SchemesPage() {
  return (
    <PromoImagePage
      src={BRAND.schemesImage}
      alt={`${BRAND.businessName} savings schemes`}
      title="Schemes"
      width={1131}
      height={1600}
    />
  );
}
