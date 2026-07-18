import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { BrandIntro } from "@/sections/BrandIntro";
import { StoryChapters } from "@/sections/StoryChapters";
import { VisionGoal } from "@/sections/VisionGoal";
import { VisitStore } from "@/sections/VisitStore";
import { Faq } from "@/sections/Faq";
import { Contact } from "@/sections/Contact";
import { FinalCta } from "@/sections/FinalCta";
import { Footer } from "@/sections/Footer";
import { FloatingWhatsApp } from "@/sections/FloatingWhatsApp";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Collections } from "@/sections/Collections";

// Home reads the Cloudinary-backed manifest (via the Collections section), so
// revalidate periodically and on-demand after admin edits.
export const revalidate = 30;

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <BrandIntro />
        <StoryChapters />
        <VisionGoal />
        <VisitStore />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
