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
  tagline: "The Largest Aesthetic Lightweight Jewellery Store",
  description:
    "Hayaz Gold & Diamonds is Mannarkkad's destination for aesthetic, lightweight gold, diamond and silver jewellery. Serving Mannarkkad and Edathanattukara with timeless craftsmanship for every celebration.",

  logo: "/icons/logo.svg",
  favicon: "/favicon.ico",

  // Cinematic autoplay hero film (Cloudinary).
  heroVideo:
    "https://res.cloudinary.com/fylz5e3j/video/upload/v1782936959/VN20260702_013328_tbexfn.mp4",

  // Editorial story chapters. Two chapters (Vision, Mission). Each chapter
  // now has its OWN dedicated Cloudinary clip that plays in full and loops
  // natively (no segment windows). To change a chapter's film, replace its
  // `video` URL below.
  storyVideos: [
    {
      heading: "Vision",
      quote: "Every masterpiece begins with a moment.",
      description:
        "Anticipate the needs and desires of customers and bring beautiful jewelry to customers at the lowest price, through this build good relationship with people.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1783092834/VN20260703_205906_yil6kq.mp4",
    },
    {
      heading: "Mission",
      mediaLeft: true,
      quote: "Elegance that never fades.",
      description:
        "To create trending & fashionable jewellery which combines elegance with uniqueness. We're continuously crafting and updating our collections to reinforce our reputation for the most admired range of jewellery and accessories.",
      video:
        "https://res.cloudinary.com/fylz5e3j/video/upload/v1783091587/VN20260703_191542_szsxvb.mp4",
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

  // /schemes page. The hero image is shared by both tabs and framed on white
  // with a thin gold border. Each tab has 3 feature cards + its own "Find the
  // Best Plan" left tabs. planTabs[].body is filled in later.
  schemesPage: {
    title: "Our Schemes",
    heroImage:
      "https://res.cloudinary.com/fylz5e3j/image/upload/v1783076308/1783076120947_toitx3.png",
    heroWidth: 1041,
    heroHeight: 768,
    findBestPlanHeading: "Find the Best Plan",
    tabs: [
      {
        label: "Golden Flexi Schemes",
        heroImage:
          "https://res.cloudinary.com/fylz5e3j/image/upload/v1783087060/Screenshot_2026-07-03_192711_mycavd.png",
        heroWidth: 1052,
        heroHeight: 422,
        features: [
          {
            icon: "save-tag",
            heading: "Save Smart. Buy Big.",
            body: "Plan your future high-value purchases with minimum monthly payments.",
          },
          {
            icon: "reward-badge",
            heading: "Enjoy Exclusive Rewards",
            body: "Save even more with additional discounts when you redeem gold.",
          },
          {
            icon: "growth-chart",
            heading: "Protection from Gold Rate Hikes",
            body: "Protect yourself from frequent gold rate hikes in the market.",
          },
        ],
        planTabs: [
          {
            heading: "Sutharya",
            points: [
              "പ്രതിമാസം 500 രൂപ മുതൽ 10,000 രൂപ വരെ അടക്കാവുന്ന ലളിതവും സുതാര്യവുമായ സ്കീം.",
              "12 മാസത്തെ കാലാവധിക്ക് ശേഷം പണിക്കൂലി ഒന്നും തന്നെ കൊടുക്കാതെ സ്വർണാഭരണങ്ങൾ സ്വന്തമാക്കാനുമുള്ള അവസരം.",
            ],
            terms: "നിബന്ധനകൾ ബാധകം",
          },
          {
            heading: "Golden Promise",
            points: [
              "പ്രതിമാസം 500 രൂപ മുതൽ 5,000 രൂപ വരെ അടക്കാവുന്ന ലളിതവും സുതാര്യവുമായ പദ്ധതി.",
              "പ്രതിമാസം അടക്കുന്ന സംഖ്യ അടക്കുന്ന തിയ്യതിയിലെ സ്വർണത്തിന്റെ നിരക്ക് അനുസരിച്ചുള്ള അളവ് സ്വർണം വരവ് വെക്കുന്നതും 12 മാസ കാലാവധിക്ക് ശേഷം പണിക്കൂലി ഒന്നും തന്നെ കൊടുക്കാതെ സ്വർണാഭരണങ്ങൾ സ്വന്തമാക്കാനുമുള്ള അവസരം.",
            ],
            terms: "നിബന്ധനകൾ ബാധകം",
          },
        ],
      },
      {
        label: "Golden Dreams Advanced Plan",
        heroImage:
          "https://res.cloudinary.com/fylz5e3j/image/upload/v1783087070/Screenshot_2026-07-03_192652_xyir4e.png",
        heroWidth: 1582,
        heroHeight: 613,
        features: [
          {
            icon: "accumulate-clock",
            heading: "Block gold rate for redemption at a later stage",
            body: "Accumulate gold with fixed contributions, adjusting with gold prices.",
          },
          {
            icon: "plan-edit",
            heading: "Plan for future high-value purchases",
            body: "Strategically plan and prepare for high-value purchases, be it luxury items, homes, cars, or any significant expense.",
          },
        ],
        planTabs: [
          {
            heading: "Classic Advance Plan",
            points: [
              "നിങ്ങളുടെ സ്വപ്ന സ്വർണ്ണാഭരണങ്ങൾ പണിക്കൂലി ഇല്ലാതെ സ്വന്തമാക്കാൻ സുരക്ഷിതവും സൗകര്യ പ്രദവുമായ ഒരു ഓപ്ഷൻ.",
              "നിങ്ങളുടെ കയ്യിലുള്ള പഴയ സ്വർണാഭരണങ്ങൾ 6 മാസ കാലയളവിലേക്ക് അഡ്വാൻസ് ബുക്കിങ്ങിലൂടെ പണിക്കൂലി ഇല്ലാതെ ( 90% Of Product Displayed at Shop ) സ്വന്തമാക്കാം.",
            ],
            terms: "നിബന്ധനകൾ ബാധകം",
          },
          {
            heading: "Premium Advance Plan",
            points: [
              "നിങ്ങളുടെ സ്വപ്ന സ്വർണ്ണാഭരണങ്ങൾ പണിക്കൂലിയും GST യും ഇല്ലാതെ സ്വന്തമാക്കാൻ സുരക്ഷിതവും സൗകര്യ പ്രദവുമായ ഒരു ഓപ്ഷൻ.",
              "നിങ്ങളുടെ കയ്യിലുള്ള പഴയ സ്വർണാഭരണങ്ങൾ 12 മാസ കാലയളവിലേക്ക് അഡ്വാൻസ് ബുക്കിങ്ങിലൂടെ പണിക്കൂലിയും GST യും ഇല്ലാതെ ( 90% Of Product Displayed at Shop ) സ്വന്തമാക്കാം.",
            ],
            terms: "നിബന്ധനകൾ ബാധകം",
          },
        ],
      },
    ],
  },

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

  // Product collections. The home page shows a right-to-left looping preview
  // per group with a small "View All" link to a white detail page at
  // /collections/{slug}. Add more groups (Diamond, Platinum) or categories
  // here — no component changes required. Product images live in
  // /public/collections/{slug}/{category}/.
  collections: {
    eyebrow: "Explore",
    heading: "Our Collections",
    subtitle:
      "Handcrafted gold, silver, diamond and platinum jewellery for every celebration.",
    groups: [
      {
        slug: "gold-silver",
        title: "Gold & Silver",
        marqueeImages: [
          { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1784302150/Screenshot_2026-07-17_205436_y76jok.png", width: 371, height: 380 },
          { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1784302282/Screenshot_2026-07-17_210059_eglsbq.png", width: 363, height: 383 },
          { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1784302226/Screenshot_2026-07-17_210012_hu0hiy.png", width: 330, height: 397 },
          { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1784302157/Screenshot_2026-07-17_205852_btxplt.png", width: 412, height: 392 },
          { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1784302201/Screenshot_2026-07-17_205936_nrx0vy.png", width: 365, height: 272 },
        ],
        categories: [
          {
            title: "Mehza - Arabic collection",
            products: [
              { image: "/collections/gold-silver/mehza/arabic-bridal-necklace.png", width: 495, height: 449, name: "Arabic Bridal Necklace" },
              { image: "/collections/gold-silver/mehza/arabic-long-haram.png", width: 383, height: 449, name: "Arabic Long Haram" },
              { image: "/collections/gold-silver/mehza/arabic-gold-bangles.png", width: 469, height: 449, name: "Arabic Gold Bangles" },
              { image: "/collections/gold-silver/mehza/arabic-drop-earrings.png", width: 327, height: 449, name: "Arabic Drop Earrings" },
              { image: "/collections/gold-silver/mehza/arabic-pendant-set.png", width: 332, height: 449, name: "Arabic Pendant Set" },
            ],
          },
          {
            title: "Hayra – Mahar Collection",
            products: [
              { image: "/collections/gold-silver/hayra-mahar/mahar-necklace.png", width: 355, height: 299, name: "Mahar Necklace" },
              { image: "/collections/gold-silver/hayra-mahar/mahar-bridal-set.png", width: 329, height: 299, name: "Mahar Bridal Set" },
              { image: "/collections/gold-silver/hayra-mahar/mahar-gold-bangles.png", width: 365, height: 299, name: "Mahar Gold Bangles" },
              { image: "/collections/gold-silver/hayra-mahar/mahar-earrings.png", width: 281, height: 299, name: "Mahar Earrings" },
              { image: "/collections/gold-silver/hayra-mahar/mahar-pendant.png", width: 189, height: 299, name: "Mahar Pendant" },
            ],
          },
        ],
      },
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
      phone: "+916235888916",
      marqueeImages: [
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783094542/2.jpg_odwggb.jpg", width: 3000, height: 3000 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783094516/HAYAZ_Gold_Diamonds_-_Mannarkkad_002-Rev_01_View05.jpg_yvc6kj.jpg", width: 2560, height: 1440 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783094500/HAYAZ_Gold_Diamonds_-_Mannarkkad_002-Rev_01_View13.jpg_xgpitp.jpg", width: 2560, height: 1440 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783094497/HAYAZ_Gold_Diamonds_-_Mannarkkad_002-Rev_01_View07.jpg_enc2oa.jpg", width: 2560, height: 1440 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783094488/HAYAZ_Gold_Diamonds_-_Mannarkkad_002-Rev_01_View04.jpg_celun6.jpg", width: 2560, height: 1440 },
      ],
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
      phone: "+916235878916",
      marqueeImages: [
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783096072/IMG-20260703-WA0031_mubi3a.jpg", width: 960, height: 1280 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783096072/IMG-20260703-WA0037_a8bqtv.jpg", width: 960, height: 1280 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783096575/Screenshot_2026-07-03_220546_jnienc.png", width: 1350, height: 897 },
        { src: "https://res.cloudinary.com/fylz5e3j/image/upload/v1783096763/IMG-20260703-WA0030_at8exj.jpg", width: 960, height: 1280 },
      ],
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

  // FAQ items (SEO). Rendered as an accordion by sections/Faq.tsx and also
  // emitted as FAQPage JSON-LD (lib/seo.ts) for FAQ rich results in search.
  faq: [
    {
      question: "Where is Hayaz Gold & Diamonds located in Mannarkkad?",
      answer:
        "Hayaz Gold & Diamonds is located at Mylaparambil Arcade, Kodathippadi, Mannarkkad, Kerala – 678582. We also have a second showroom in Edathanattukara (Padikkapadam, Alanallur, Palakkad – 678601). Google Maps directions to both jewellery showrooms are available on this page.",
    },
    {
      question: "What types of jewellery does Hayaz Gold offer?",
      answer:
        "As the largest aesthetic lightweight jewellery store in Mannarkkad, Hayaz Gold & Diamonds offers gold, diamond, silver and platinum jewellery, including bridal sets, daily-wear pieces, necklaces, bangles, rings and earrings, crafted for every celebration.",
    },
    {
      question: "Is the gold jewellery at Hayaz Gold BIS hallmarked?",
      answer:
        "Yes. We offer BIS hallmarked gold jewellery, so every piece carries a certified purity mark that guarantees its caratage and quality.",
    },
    {
      question: "Does Hayaz Gold offer low making charges?",
      answer:
        "Yes. Hayaz Gold & Diamonds is known for quality gold and diamond jewellery at low making charges, giving customers in Mannarkkad and Edathanattukara excellent value on every purchase.",
    },
    {
      question: "What gold savings schemes are available at Hayaz Gold?",
      answer:
        "We offer flexible gold savings schemes to help you plan your purchase: the Golden Flexi Schemes (Sutharya and Golden Promise) and the Golden Dreams Advanced Plan. Pay a comfortable amount each month and own your dream jewellery. Terms and conditions apply.",
    },
    {
      question: "What are the opening hours of the Hayaz Gold showrooms?",
      answer:
        "Our showrooms are open Monday to Saturday from 9:30 AM to 8:00 PM, and on Sunday from 10:00 AM to 7:00 PM.",
    },
    {
      question:
        "Can I buy diamond and silver jewellery at Hayaz Gold in Mannarkkad?",
      answer:
        "Absolutely. Alongside gold, Hayaz Gold & Diamonds offers certified diamond jewellery and a beautiful silver collection at both our Mannarkkad and Edathanattukara showrooms.",
    },
    {
      question: "How can I contact or visit Hayaz Gold & Diamonds?",
      answer:
        "Call our Mannarkkad showroom at +91 62358 88916 or our Edathanattukara showroom at +91 62358 78916, message us on WhatsApp, or visit us in person. We would love to help you find the perfect piece.",
    },
    {
      question: "Why choose Hayaz Gold & Diamonds in Mannarkkad?",
      answer:
        "Since 2022, Hayaz Gold & Diamonds has become one of Mannarkkad's most loved jewellers by combining aesthetic, lightweight designs with trusted quality and low making charges. A large family of loyal customers across Kerala trusts us for gold, diamond, silver and platinum jewellery.",
    },
  ],

  whatsappMessage:
    "Hello Hayaz Gold, I'd like to know more about your jewellery collections.",
};
