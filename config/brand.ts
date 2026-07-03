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
      heading: "Vision",
      quote: "Every masterpiece begins with a moment.",
      description:
        "Anticipate the needs and desires of customers and bring beautiful jewelry to customers at the lowest price, through this build good relationship with people.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",
      segments: { startAt: 0, loopEnd: 8 },
    },
    {
      heading: "Mission",
      mediaLeft: true,
      quote: "Elegance that never fades.",
      description:
        "To create trending & fashionable jewellery which combines elegance with uniqueness. We're continuously crafting and updating our collections to reinforce our reputation for the most admired range of jewellery and accessories.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",
      // Final part of the 40s film (last ~8 seconds).
      segments: { startAt: 32, loopEnd: 40 },
    },
  ],

  storeImages: [
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazbb_wb1juf.webp",
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazgg_dtolmr.webp",
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1782940196/hayazcc_vuguic.webp",
  ],

  // Offers poster (Cloudinary). Linked from the Offers button.
  offersImage:
    "https://res.cloudinary.com/fylz5e3j/image/upload/v1783064597/offers_hayazgold_vpwgem.jpg",

  // Savings schemes (Cloudinary). Each entry becomes a button on /schemes that
  // reveals its image on click. Add or remove entries here to change the page.
  schemes: [
    {
      label: "Hayaz Golden Flexi Schemes",
      image:
        "https://res.cloudinary.com/fylz5e3j/image/upload/v1783068121/schemes_hayazgold_goldenflexi_f2amro.jpg",
      width: 1131,
      height: 579,
    },
    {
      label: "Golden Dreams Advanced Plan",
      image:
        "https://res.cloudinary.com/fylz5e3j/image/upload/v1783068121/schemes_hayazgold_goldendreams_hslgcg.jpg",
      width: 1131,
      height: 680,
    },
  ],

  // "Journey Towards Goal" — Vision 2035 milestones (full-width stats section
  // that replaced the third story chapter). Edit values/labels here.
  visionGoal: {
    title: "Journey Towards Goal",
    subtitle: "VISION 2035",
    stats: [
      { value: "10", label: "Stores" },
      { value: "20,000", label: "Sqft Shopping Area" },
      { value: "500", label: "Management Team" },
      { value: "5 Million", label: "Satisfied Customers" },
      { value: "2 Country", label: "Brand Presence" },
    ],
  },

  // Two retail outlets. Rendered everywhere the address appears (Visit Store,
  // Contact, Footer, JSON-LD). Add/remove entries here to change outlets.
  branches: [
    {
      name: "HAYAZ GOLD AND DIAMONDS",
      area: "Mannarkkad",
      street: "Mylaparambil Arcade, Kodathippadi",
      city: "Mannarkkad",
      state: "Kerala",
      pincode: "678582",
      mapsLink:
        "https://www.google.com/maps/search/?api=1&query=Hayaz+Gold+and+Diamonds+Mylaparambil+Arcade+Kodathippadi+Mannarkkad+Kerala+678582",
    },
    {
      name: "HAYAZ GOLD EDATHANATTUKARA",
      area: "Edathanattukara",
      street:
        "Ground Floor, 3/1448, Kottapalla, Vattamannapuram Road, Padikkapadam, Edathanattukara, Alanallur 1",
      city: "Palakkad",
      state: "Kerala",
      pincode: "678601",
      mapsLink:
        "https://www.google.com/maps/search/?api=1&query=Hayaz+Gold+Edathanattukara+Padikkapadam+Alanallur+Palakkad+Kerala+678601",
    },
  ],

  phone: "+916235888916",
  whatsapp: "916235888916",
  email: "",

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
