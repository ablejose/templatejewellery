export interface StoryVideo {
  /** Editorial quote shown in the chapter */
  quote: string;
  /** Supporting paragraph */
  description: string;
  /** Cloudinary video URL */
  video: string;
  /** Optional loop timing windows (seconds). UI never guesses these. */
  segments?: VideoSegments;
}

export interface VideoSegments {
  transitionStart: number;
  transitionEnd: number;
  loopStart: number;
  loopEnd: number;
  scrollResume: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
}

export interface BrandConfig {
  businessName: string;
  tagline: string;
  description: string;

  logo: string;
  favicon: string;

  heroVideo: string;

  storyVideos: StoryVideo[];

  storeImages: string[];

  address: string;
  city: string;
  state: string;
  pincode: string;

  phone: string;
  whatsapp: string;
  email: string;

  mapsLink: string;

  openingHours: string;

  instagram: string;
  facebook: string;
  youtube?: string;

  seo: SeoConfig;

  faq: FaqItem[];

  whatsappMessage: string;
}
