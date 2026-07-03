import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { SchemesGallery } from "@/components/SchemesGallery";

export const metadata: Metadata = {
  title: "Schemes",
  description: `Savings schemes at ${BRAND.businessName}.`,
};

export default function SchemesPage() {
  return <SchemesGallery />;
}
