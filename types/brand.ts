export interface StoryVideo {
  /** Optional bold gold headline that replaces the "Chapter NN" label and the
   *  quote for this chapter (e.g. "Vision"). When omitted, the default
   *  "Chapter NN" label + quote are shown. */
  heading?: string;
  /** When true, on desktop the video sits on the LEFT and the text on the
   *  RIGHT (default is text-left / video-right). Mobile always stacks text
   *  above the video. */
  mediaLeft?: boolean;
  /** Editorial quote shown in the chapter (also used as the video label) */
  quote: string;
  /** Supporting paragraph */
  description: string;
  /** Cloudinary video URL */
  video: string;
  /** Optional loop timing windows (seconds). UI never guesses these. */
  segments?: VideoSegments;
}

export interface VideoSegments {
  /** Where this chapter's clip begins playing (seconds). Distinct per chapter
   *  so scrollers see a different part of the film in each section. */
  startAt: number;
  /** End of this chapter's window (seconds). Playback loops back to startAt
   *  when it reaches loopEnd. */
  loopEnd: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SchemeItem {
  /** Button label shown on the /schemes page */
  label: string;
  /** Cloudinary image URL revealed when the button is clicked */
  image: string;
  /** Intrinsic image dimensions (keep aspect ratio, prevent layout shift) */
  width: number;
  height: number;
}

export interface VisionStat {
  /** Large number/value, e.g. "10" or "5 Million" */
  value: string;
  /** Small caption under the value, e.g. "Stores" */
  label: string;
}

export interface VisionGoal {
  /** Section title, e.g. "Journey Towards Goal" */
  title: string;
  /** Sub-heading, e.g. "VISION 2035" */
  subtitle: string;
  /** Milestone stats rendered as a divided row */
  stats: VisionStat[];
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

  /** Offers poster image (Cloudinary). Shown on the /offers page. */
  offersImage: string;
  /** Savings schemes shown on the /schemes page (one button reveals each image). */
  schemes: SchemeItem[];
  /** "Journey Towards Goal" full-width stats section (Vision 2035). */
  visionGoal: VisionGoal;

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
