import type { BrandConfig } from "@/types/brand";

/**
 * SINGLE SOURCE OF TRUTH.
 *
 * To rebrand this website for a different jewellery business, edit ONLY this
 * file and the Cloudinary asset URLs. No component code should change.
 *
 * Reference: Document 1 §6 Brand Configuration Schema.
 */
export const BRAND: BrandConfig = {
  businessName: "Hayaz Gold",
  tagline: "The Largest Aesthetic Lightweight Jewellery Store in Mannarkkad",
  description:
    "Hayaz Gold & Diamonds is Mannarkkad's destination for aesthetic, lightweight gold, diamond and silver jewellery. Serving Mannarkkad and Edathanattukara with timeless craftsmanship for every celebration.",

  logo: "/icons/logo.svg",
  favicon: "/favicon.ico",

  // Cinematic autoplay hero film (Cloudinary).
  heroVideo:
    "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",

  // Editorial story chapters. Three chapters.
  // Only one cinematic video was supplied, so it is reused — but each chapter
  // starts at a DIFFERENT point in the film (segments.startAt) and loops within
  // its own window (segments.loopEnd), so a visitor scrolling through sees a
  // different part of the video in each section rather than the same opening.
  // When you have separate clips per chapter, just replace each `video` URL and
  // adjust or remove its `segments`.
  storyVideos: [
    {
      quote: "Every masterpiece begins with a moment.",
      description:
        "From the first spark of inspiration to the final polish, each piece is shaped with patience and intent — designed to be worn, treasured and remembered.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",
      segments: { startAt: 0, loopEnd: 8 },
    },
    {
      quote: "Elegance that never fades.",
      description:
        "Aesthetic, lightweight designs crafted to move with you — refined enough for every day, distinguished enough for the occasions that matter most.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",
      segments: { startAt: 8, loopEnd: 16 },
    },
    {
      quote: "Where tradition meets timeless beauty.",
      description:
        "Rooted in Mannarkkad and Edathanattukara, our collections honour heritage while embracing a modern, understated sense of luxury.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",
      segments: { startAt: 16, loopEnd: 24 },
    },
  ],

  storeImages: [
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazbb_wb1juf.webp",
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazgg_dtolmr.webp",
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazcc_vuguic.webp",
  ],

  address: "Ansari Building, Kodathippadi, Mannarkkad, Kerala 678582",
  city: "Mannarkkad",
  state: "Kerala",
  pincode: "678582",

  phone: "+916235888916",
  whatsapp: "916235888916",
  email: "",

  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Hayaz+Gold+Ansari+Building+Kodathippadi+Mannarkkad+Kerala+678582",

  openingHours: "Mon–Sat: 9:30 AM – 8:00 PM · Sunday: 10:00 AM – 7:00 PM",

  instagram: "https://www.instagram.com/hayazgoldanddiamonds",
  facebook: "https://www.facebook.com/hayazgold",

  seo: {
    title: "Hayaz Gold & Diamonds | Lightweight Jewellery in Mannarkkad",
    description:
      "Hayaz Gold & Diamonds — the largest aesthetic lightweight jewellery store in Mannarkkad. Gold, diamonds and silver for every celebration. Mannarkkad & Edathanattukara, Kerala.",
    keywords: [
      "Hayaz Gold",
      "Hayaz Gold and Diamonds",
      "jewellery Mannarkkad",
      "gold jewellery Mannarkkad",
      "lightweight jewellery Kerala",
      "diamonds Mannarkkad",
      "silver jewellery Edathanattukara",
      "jewellery store Palakkad",
    ],
    canonical: "https://hayazgold.com",
    ogImage:
      "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazbb_wb1juf.webp",
  },

  // Left intentionally empty per brief. Add { question, answer } items to populate the FAQ section.
  faq: [],

  whatsappMessage:
    "Hello Hayaz Gold, I'd like to know more about your jewellery collections.",
};
