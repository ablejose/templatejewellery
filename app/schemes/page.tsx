import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { Navbar } from "@/sections/Navbar";
import { SchemesGallery } from "@/components/SchemesGallery";

export const metadata: Metadata = {
  title: "Schemes",
  description: `Savings schemes at ${BRAND.businessName}.`,
};

export default function SchemesPage() {
  return (
    <>
      <Navbar homeHref="/" solid />
      <SchemesGallery />
    </>
  );
}
