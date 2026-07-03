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

/** Icon keys for the /schemes feature cards (see components/SchemeIcon.tsx). */
export type SchemeIconName =
  | "save-tag"
  | "reward-badge"
  | "growth-chart"
  | "accumulate-clock"
  | "plan-edit"
  | "card-clock";

export interface SchemeFeature {
  /** Which built-in SVG icon to render */
  icon: SchemeIconName;
  heading: string;
  body: string;
}

export interface SchemePlanTab {
  /** Left-hand tab heading, e.g. "Sutharya" */
  heading: string;
  /** Body content shown when the tab is active (provided later; optional). */
  body?: string;
}

export interface SchemeTab {
  /** Hero tab label, e.g. "Golden Flexi Schemes" */
  label: string;
  /** Three feature cards shown for this tab (icon + heading + body) */
  features: SchemeFeature[];
  /** "Find the Best Plan" left-hand swappable tabs for this scheme */
  planTabs: SchemePlanTab[];
}

export interface SchemesPage {
  /** Page title, e.g. "Our Schemes" (rendered in rich gold) */
  title: string;
  /** Shared hero image (same for both tabs), framed on white with a gold line */
  heroImage: string;
  heroWidth: number;
  heroHeight: number;
  /** Heading for the plan-comparison section, e.g. "Find the Best Plan" */
  findBestPlanHeading: string;
  /** The two hero tabs (Golden Flexi, Golden Dreams) */
  tabs: SchemeTab[];
}

export interface Branch {
  /** Outlet name, e.g. "HAYAZ GOLD AND DIAMONDS" */
  name: string;
  /** Short area label used for headings/labels, e.g. "Mannarkkad" */
  area: string;
  /** Street portion of the address (everything before the city) */
  street: string;
  city: string;
  state: string;
  pincode: string;
  /** Google Maps link for this outlet (linked, never embedded) */
  mapsLink: string;
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
  /** Rich, tabbed /schemes page (hero + feature cards + plan tabs). */
  schemesPage: SchemesPage;
  /** "Journey Towards Goal" full-width stats section (Vision 2035). */
  visionGoal: VisionGoal;

  /** Retail outlets. Replaces the former single address/city/state/pincode/
   *  mapsLink fields — rendered wherever the address appears. */
  branches: Branch[];

  phone: string;
  whatsapp: string;
  email: string;

  openingHours: string;

  instagram: string;
  facebook: string;
  youtube?: string;

  seo: SeoConfig;

  faq: FaqItem[];

  whatsappMessage: string;
}
