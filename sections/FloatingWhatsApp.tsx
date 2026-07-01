"use client";

import { motion } from "motion/react";
import { BRAND } from "@/config/brand";
import { useScrollIdle } from "@/hooks/useScrollIdle";
import { whatsappHref } from "@/lib/format";

/**
 * Floating WhatsApp button (Document 2 §10). Fixed bottom-right, circular.
 * Hidden while scrolling rapidly, reappears after idle. Uses BRAND.whatsapp
 * and BRAND.whatsappMessage.
 */
export function FloatingWhatsApp() {
  const scrolling = useScrollIdle();

  return (
    <motion.a
      href={whatsappHref(BRAND.whatsapp, BRAND.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${BRAND.businessName} on WhatsApp`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-pill bg-gold text-background shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: scrolling ? 0 : 1,
        scale: scrolling ? 0.8 : 1,
        pointerEvents: scrolling ? "none" : "auto",
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.46 15.02L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 0 16.2 8 8 0 0 1-4.08-1.12l-.29-.17-3.03.8.81-2.95-.19-.3A8.1 8.1 0 0 1 12.04 3.8Zm-2.4 4.3c-.18 0-.47.07-.72.34-.24.27-.94.92-.94 2.24 0 1.32.96 2.6 1.1 2.78.13.18 1.88 2.87 4.55 3.92 2.22.87 2.67.7 3.15.66.48-.05 1.55-.63 1.77-1.24.22-.61.22-1.14.15-1.25-.07-.11-.24-.18-.5-.31-.27-.14-1.56-.77-1.8-.86-.24-.09-.42-.13-.6.14-.17.27-.68.86-.83 1.03-.15.18-.31.2-.57.07-.27-.14-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.48-1.84-.15-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.46-.83-2-.22-.53-.44-.46-.6-.46l-.51-.01Z" />
      </svg>
    </motion.a>
  );
}
